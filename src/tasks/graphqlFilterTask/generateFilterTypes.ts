import { type JSONSchema } from 'json-schema-typed';
import * as fs from 'fs';
import * as path from 'path';

// Define the mapping from JSON schema types to filter input types
const typeToFilterMap: Record<string, string> = {
  'string': 'StringFilterInput',
  'number': 'NumberFilterInput',
  'integer': 'NumberFilterInput',
  'boolean': 'BooleanFilterInput',
  'array': 'ArrayFilterInput',
  'object': 'ObjectFilterInput',
};

// Define the mapping from JSON schema formats to filter input types
const formatToFilterMap: Record<string, string> = {
  'date-time': 'DateFilterInput',
  'date': 'DateFilterInput',
  'time': 'StringFilterInput',
  'email': 'StringFilterInput',
  'uri': 'StringFilterInput',
};

// Function to convert a string to PascalCase
function pascalCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toUpperCase());
}

// Function to convert a string to camelCase
function camelCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toLowerCase());
}

// Function to get the appropriate filter type for a field
function getFilterTypeForField(field: any, modelName: string, fieldName: string, nestedFilters: Set<string>): string {
  // Handle special case for ObjectId fields
  if (field.type === 'string' && field.maxLength === 32) {
    return 'StringFilterInput'; // Could be ObjectIdFilterInput if you have one
  }

  // Handle date-time format
  if (field.format === 'date-time') {
    return 'DateFilterInput';
  }

  // Handle nested objects
  if (field.type === 'object' && field.properties) {
    const nestedName = pascalCase(`${modelName}${pascalCase(fieldName)}`);
    nestedFilters.add(nestedName);
    return `${nestedName}Filter`;
  }

  // Handle arrays of objects
  if (field.type === 'array' && field.items && field.items.type === 'object' && field.items.properties) {
    const nestedName = pascalCase(`${modelName}${pascalCase(fieldName)}Item`);
    nestedFilters.add(nestedName);
    return 'ArrayFilterInput'; // We use ArrayFilterInput for the array itself
  }

  // Handle arrays of primitives
  if (field.type === 'array' && field.items) {
    return 'ArrayFilterInput';
  }

  // Use the format mapping if available
  if (field.format && formatToFilterMap[field.format]) {
    return formatToFilterMap[field.format];
  }

  // Use the type mapping if available
  if (field.type && typeToFilterMap[field.type]) {
    return typeToFilterMap[field.type];
  }

  // Default to StringFilterInput for unknown types
  return 'StringFilterInput';
}

// Function to generate a filter class for a nested object
function generateNestedFilterClass(modelName: string, nestedName: string, properties: any, imports: Set<string>, nestedFilters: Set<string>): string {
  let output = `// Filter for ${camelCase(nestedName)} objects\n// @ts-ignore\n@InputType()\nexport class ${nestedName}Filter {\n`;

  for (const [fieldName, fieldDef] of Object.entries(properties)) {
    const filterType = getFilterTypeForField(fieldDef, modelName, fieldName, nestedFilters);
    imports.add(filterType.replace('Filter', ''));

    output += `  // @ts-ignore\n  @Field(() => ${filterType}, { nullable: true })\n  ${camelCase(fieldName)}?: ${filterType};\n\n`;
  }

  output += '}\n\n';
  return output;
}

// Function to process nested objects and arrays
const processNestedSchemas = (
  modelName: string,
  // schema: { properties?: Record<string, any> },
  schema: JSONSchema,
  imports: Set<string>,
  nestedFilters: Set<string>
): string => {
  let output = '';

  if (!schema || schema === true || !schema.properties) {
    return output;
  }

  for (const [fieldName, fieldDef] of Object.entries(schema.properties)) {
    if (typeof fieldDef !== 'boolean' && fieldDef.type === 'object' && fieldDef.properties) {
      // Generate nested filter classes for object properties
      const nestedName = pascalCase(`${modelName}${pascalCase(fieldName)}`);
      output += generateNestedFilterClass(modelName, nestedName, fieldDef.properties, imports, nestedFilters);
    }

    // Generate nested filter classes for array items that are objects
    if (
      typeof fieldDef !== 'boolean' &&
      typeof fieldDef.items !== 'boolean' &&
      fieldDef.type === 'array' &&
      fieldDef.items &&
      fieldDef.items.type === 'object' &&
      fieldDef.items.properties
    ) {
      const nestedName = pascalCase(`${modelName}${pascalCase(fieldName)}Item`);
      output += generateNestedFilterClass(modelName, nestedName, fieldDef.items.properties, imports, nestedFilters);
    }
  }

  // Process nested filters that were discovered during processing
  const processedFilters = new Set<string>();

  for (const nestedName of nestedFilters) {
    if (processedFilters.has(nestedName)) continue;

    // Find the corresponding field in the schema
    for (const [fieldName, fieldDef] of Object.entries(schema.properties || {})) {
      if (nestedName === pascalCase(`${modelName}${pascalCase(fieldName)}`)) {
        if (typeof fieldDef !== 'boolean' && fieldDef.type === 'object' && fieldDef.properties) {
          // Already processed above
          processedFilters.add(nestedName);
        }
      } else if (nestedName === pascalCase(`${modelName}${pascalCase(fieldName)}Item`)) {
        if (
          typeof fieldDef !== 'boolean' &&
          typeof fieldDef.items !== 'boolean' &&
          fieldDef.type === 'array' &&
          fieldDef.items &&
          fieldDef.items.type === 'object' &&
          fieldDef.items.properties
        ) {
          // Already processed above
          processedFilters.add(nestedName);
        }
      }
    }
  }

  return output;
}

// Function to generate a filter class for a model
function generateModelFilterClass(
  modelName: string,
  schema: { properties?: Record<string, any> }
): string {
  const imports = new Set<string>(['FilterInput', 'StringFilterInput', 'DateFilterInput', 'ArrayFilterInput', 'ObjectFilterInput']);
  const nestedFilters = new Set<string>();

  // Process nested schemas
  const nestedFilterClasses = processNestedSchemas(modelName, schema, imports, nestedFilters);

  // Start building the output
  let output = `import { Field, InputType } from 'type-graphql';\nimport {\n`;

  // Add imports
  output += Array.from(imports).map(imp => `  ${imp}${imp.endsWith('Input') ? '' : 'FilterInput'}`).join(',\n');
  output += `\n} from './baseFilterTypes';\n\n`;

  // Add nested filter classes
  output += nestedFilterClasses;

  // Add main filter class
  output += `// Main ${modelName} filter\n// @ts-ignore\n@InputType()\nexport class ${modelName}Filter extends FilterInput {\n`;

  // Add filter fields for each property in the schema
  for (const [fieldName, fieldDef] of Object.entries(schema.properties || {})) {
    const filterType = getFilterTypeForField(fieldDef, modelName, fieldName, nestedFilters);

    output += `  // @ts-ignore\n  @Field(() => ${filterType}, { nullable: true })\n  ${camelCase(fieldName)}?: ${filterType};\n\n`;
  }

  output += '}\n';

  return output;
}

// Function to generate filter types for all models
function generateFilterTypes(schemaDir: string, outputDir: string): void {
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all schema files
  const schemaFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('Schema.ts'));

  // Process each schema file
  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(schemaDir, schemaFile);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    // Extract the schema name and content
    const schemaNameMatch = schemaContent.match(/export const (\w+)Schema = /);
    if (!schemaNameMatch) continue;

    const schemaName = schemaNameMatch[1];

    // Parse the schema content
    const schemaJson = eval(`(${schemaContent.split('=')[1].trim()})`);

    // Generate the filter class
    const filterContent = generateModelFilterClass(schemaName, schemaJson);

    // Write the filter class to a file
    const outputPath = path.join(outputDir, `${schemaName}Filter.ts`);
    fs.writeFileSync(outputPath, filterContent);

    console.log(`Generated filter types for ${schemaName}`);
  }

  // Generate an index file to export all filters
  const indexContent = schemaFiles
    .map(file => {
      const schemaName = file.replace('Schema.ts', '');
      return `export { ${schemaName}Filter } from './${schemaName}Filter';`;
    })
    .join('\n');

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log('Generated index file');
}

// Main function
function main(): void {
  const schemaDir = path.join(__dirname, '../services/models/schema');
  const outputDir = path.join(__dirname, '../services/graphqlApi/types/filters');

  generateFilterTypes(schemaDir, outputDir);
}

// Run the main function
if (require.main === module) {
  main();
}

// Export functions for testing
export {
  generateModelFilterClass,
  generateFilterTypes
};
