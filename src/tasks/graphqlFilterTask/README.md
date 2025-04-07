# GraphQL Filter Type Generator

This tool automatically generates GraphQL filter types for your models based on their JSON schemas.

## Overview

The filter type generator:

1. Reads JSON schema files from `src/services/models/schema`
2. Generates filter types for each model
3. Handles nested objects and arrays
4. Creates an index file to export all filter types

## Usage

### Generate Filter Types

To generate filter types for all models:

```bash
# Run the generator
npm run generate-filters
```

This will:
1. Compile the TypeScript generator
2. Run the generator
3. Create filter type files in `src/services/graphqlApi/types/filters`

### Run Tests

To run the tests for the filter type generator:

```bash
# Run the tests
npm run test-filter-generator
```

## Adding to Your Build Process

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "generate-filters": "node src/scripts/generateFilters.js",
    "test-filter-generator": "node src/scripts/testFilterGenerator.js",
    "build": "npm run generate-filters && tsc"
  }
}
```

## How It Works

The generator:

1. Maps JSON schema types to filter input types:
   - `string` → `StringFilterInput`
   - `number`/`integer` → `NumberFilterInput`
   - `boolean` → `BooleanFilterInput`
   - `array` → `ArrayFilterInput`
   - `object` → Custom filter class or `ObjectFilterInput`

2. Handles special formats:
   - `date-time` → `DateFilterInput`
   - `date` → `DateFilterInput`
   - `email` → `StringFilterInput`
   - `uri` → `StringFilterInput`

3. Creates nested filter classes for:
   - Object properties
   - Array items that are objects

4. Generates a main filter class that extends `FilterInput` with:
   - Fields for each property in the schema
   - Logical operators (AND, OR, NOT)

## Example

For a schema like:

```typescript
export const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 32 },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' }
      }
    },
    createdAt: { type: 'string', format: 'date-time' }
  }
};
```

The generator will create:

```typescript
// UserAddressFilter for the nested address object
@InputType()
export class UserAddressFilter {
  @Field(() => StringFilterInput, { nullable: true })
  street?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  city?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  zipCode?: StringFilterInput;
}

// Main UserFilter
@InputType()
export class UserFilter extends FilterInput {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  email?: StringFilterInput;

  @Field(() => UserAddressFilter, { nullable: true })
  address?: UserAddressFilter;

  @Field(() => DateFilterInput, { nullable: true })
  createdAt?: DateFilterInput;
}
```

## Customization

You can customize the generator by:

1. Modifying the type mappings in `typeToFilterMap` and `formatToFilterMap`
2. Adding special case handling in `getFilterTypeForField`
3. Changing the output format in `generateModelFilterClass`
