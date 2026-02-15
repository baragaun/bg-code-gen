## Purpose

Create an `Input` version of a model definition for use in the GraphQL API. This is necessary because
GraphQL requires separate types for input (used in mutations) and output (used in queries).

## Learn

- [bg-code-gen topic](../bg-code-gen/topic.md)

## Arguments

```yaml
args:
    - name: projectName
      type: string
      description: name of the project (e.g., `mmdata`)
    - name: serviceName
      type: string
      description: name of the service (e.g., `accounts`, `academy`, etc.)
    - name: modelName
      type: string
      description: base name of the model without the `Input` suffix (e.g., `AcyChapter`, `AcyCertificate`)
```

## Naming conventions

Derived names used throughout the steps (example with `modelName` = `AcyChapter`):

| Derived name             | Pattern                      | Example                  |
|--------------------------|------------------------------|--------------------------|
| Full name                | `<modelName>Input`           | `AcyChapterInput`        |
| camelCase name           | camelCase of full name       | `acyChapterInput`        |
| File name                | `<camelCaseName>.ts`         | `acyChapterInput.ts`     |
| Original camelCase name  | camelCase of modelName       | `acyChapter`             |

## Steps

1. Locate the existing model definition file for the specified model at:
   `tools/bg-code-gen/modelDefs/<projectName>/<serviceName>/<originalCamelCaseName>.ts`
2. Copy the existing model def file to a new file at:
   `tools/bg-code-gen/modelDefs/<projectName>/<serviceName>/<camelCaseName>.ts`
3. Edit the new input file:
   * Rename the exported variable from `<originalCamelCaseName>` to `<camelCaseName>`.
   * Append `Input` to the `name` field (e.g., `AcyChapterInput`).
   * Change `GraphqlType.ObjectType` to `GraphqlType.InputType`.
   * Append `Input` to the class in `extends` (e.g., `BaseModelRevision` → `BaseModelRevisionInput`).
   * Update `sourceProject` to `<projectName>`.
   * Update the `path` field to `src/services/<serviceName>/types/models/<ModelName>Input.ts`.
   * Remove the `dbCollectionName` field if present (Input types are not persisted directly).
   * Remove `optional: true` from all attributes (the code generator handles nullability
     differently for InputTypes).
   * Remove all `default` fields from the attributes.
   * If attributes use other GraphQL types that are not enums, append `Input` to their `dataType` (e.g.,
     `dataType: 'LocalizedString'` → `dataType: 'LocalizedStringInput'`).
   * Review the attributes and make any necessary adjustments. Comment out fields that should
     not be provided by the caller, such as system-computed or read-only fields (e.g., aggregation
     counts, derived status fields).
4. Add a named import for the new file in the `index.ts` file of `tools/bg-code-gen/modelDefs/<projectName>/<serviceName>/`,
   and add the new model def to the exported array. Use default import syntax: `import <camelCaseName> from './<camelCaseName>.js'`
5. Alphabetically sort both the imports and the array entries in the index file.
