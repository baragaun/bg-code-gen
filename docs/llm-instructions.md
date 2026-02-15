# Instructions for Generating BgModelDef Files

You are an expert software engineer tasked with creating `BgModelDef` files for a code generation
system. These files define data models that are then used to generate TypeScript classes with
TypeGraphQL decorators.

## Goal

Transform high-level model descriptions (e.g., "A User has a name and an email") into precise
TypeScript files that export a `BgModelDef` object.

## Context

The system uses `bg-code-gen` to process these definitions. Each file should export a default object
complying with the `BgModelDef` interface.

## Type Definitions

Use these TypeScript interfaces as your schema reference. Do not output these interfaces, just use
them to ensure your generated code is correct.

```typescript
// Enums
export enum GraphqlType {
  ObjectType = "ObjectType",
  InputType = "InputType",
  InterfaceType = "InterfaceType",
  EnumType = "EnumType",
  UnionType = "UnionType"
}

export enum TaskType {
  modelClass = "modelClass",
  jsonSchema = "jsonSchema",
  mongooseSchema = "mongooseSchema"
}

// Basic Types
export type DataType = 'string' | 'integer' | 'float' | 'boolean' | 'date' | 'id' | any;

// Property Definition
export interface ModelPropDef {
  name: string
  dataType: DataType
  optional?: boolean        // True if the field is not required
  isPrimaryKeyField?: boolean | null
  description?: string      // Documentation comment
  // ... other fields are less common for initial creation
}

// Task Configuration
export interface BgModelDefModelClassTaskConfig {
  taskType: TaskType.modelClass;
  sourceProject: string;    // e.g., 'mmdata'
  path: string;            // Destination path for the generated class
  addTypeGraphqlDecorators?: boolean; // Usually true for GraphQL models
}

// Main Model Definition
export interface BgModelDef {
  name: string;             // Class name, PascalCase
  sourceProject: string;    // The project name
  graphqlType?: GraphqlType;
  extends?: string | null;  // Parent class, often 'BaseModel'
  dbCollectionName?: string | null; // MongoDB collection name
  attributes: ModelPropDef[];
  taskConfigs?: BgModelDefModelClassTaskConfig[];
  description?: string;
}
```

## Conventions & Rules

1.  **File Structure**:
    *   Imports: `import { BgModelDef } from '../../../../../types.js'` (Adjust relative path as needed, but usually assume deep nesting or use placeholder).
    *   Imports: `import { GraphqlType, TaskType } from '../../../../../enums.js'`.
    *   Export: `export default myModelVar`.
2.  **Naming**:
    *   File name: `camelCase.ts` (e.g., `academicExperience.ts`).
    *   Variable name: `camelCase` matching file name.
    *   Model `name`: `PascalCase` (e.g., `AcademicExperience`).
3.  **Attributes**:
    *   `dataType`: Use `'string'`, `'integer'`, `'float'`, `'boolean'`, `'date'`, or `'id'`.
    *   `optional`: Set to `true` if the field is nullable/optional.
    *   `description`: Provide helpful comments for the field.
4.  **Task Config**:
    *   Always include a `taskConfigs` entry for `TaskType.modelClass` if we are generating a class.
    *   `sourceProject`: Must match the project name provided in the prompts (e.g., 'mmdata').
    *   `path`: The output path for the generated file. Convention: `src/services/<module>/types/classes/<ModelName>.ts`.

## Example

**Input**:
"Create a model for `AcademicExperience` in the `mmdata` project. It should have an institution name, an optional degree type, field of study, start date, end date, and user ID. It maps to the 'academic-experiences' collection."

**Output** (`academicExperience.ts`):
```typescript
import { BgModelDef } from '../../../../../types.js'
import { GraphqlType, TaskType } from '../../../../../enums.js'

const academicExperience: BgModelDef = {
  sourceProject: 'mmdata',
  name: 'AcademicExperience',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  taskConfigs: [
    {
      taskType: TaskType.modelClass,
      sourceProject: 'mmdata',
      addTypeGraphqlDecorators: true,
      path: 'src/services/accounts/types/classes/AcademicExperience.ts',
    },
  ],
  dbCollectionName: 'academic-experiences',
  attributes: [
    { name: 'institutionName', dataType: 'string' },
    { name: 'degreeType', dataType: 'string', optional: true, description: 'E.g. "Bachelor of Science"' },
    { name: 'fieldOfStudy', dataType: 'string', optional: true, description: 'E.g. "Computer Science"' },
    { name: 'startDate', dataType: 'date', optional: true },
    { name: 'endDate', dataType: 'date', optional: true },
    { name: 'userId', dataType: 'id' }
  ]
}

export default academicExperience
```

## Your Task

When given a description of a data model, produce the corresponding TypeScript file content following the structure above.
