## Purpose

Create file containing a `BgModelDef` object that defines the list filter for a model, e.g.
 `SampleModelListFilter.ts`. List filters are used to search in lists through the GraphQL API.

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
      description: base name of the model without the `ListFilter` suffix (e.g., `AcyCertificate`, `AcyChapter`)
```

## Naming conventions

Derived names used throughout the steps (example with `modelName` = `AcyChapter`):

| Derived name       | Pattern                      | Example                    |
|---------------------|------------------------------|----------------------------|
| Full name           | `<modelName>ListFilter`      | `AcyChapterListFilter`     |
| camelCase name      | camelCase of full name       | `acyChapterListFilter`     |
| File name           | `<camelCaseName>.ts`         | `acyChapterListFilter.ts`  |

## Steps

1. Build the file path: `tools/bg-code-gen/modelDefs/<projectName>/<serviceName>/<camelCaseName>.ts`
2. Check if the file already exists. If it does, do not overwrite it; instead, log a message and exit.
3. Create a new file at the specified path, and add the following content, replacing the placeholders
   with the appropriate values:

```ts
import { BgModelDef } from '../../../../../types.js'
import { GraphqlType, TaskType } from '../../../../../enums.js'

const <camelCaseName>: BgModelDef = {
  name: '<modelName>ListFilter',
  extends: 'BaseListFilter',
  graphqlType: GraphqlType.InputType,
  sourceProject: '<projectName>',
  taskConfigs: [
    {
      taskType: TaskType.modelClass,
      sourceProject: '<projectName>',
      addTypeGraphqlDecorators: true,
      path: 'src/services/<serviceName>/types/models/<modelName>ListFilter.ts',
    },
  ],
  attributes: [
  ]
}

export default <camelCaseName>
```

4. Add a default import for the new file in the `index.ts` file of `tools/bg-code-gen/modelDefs/<projectName>/<serviceName>/`,
   and add the new model def to the exported array. Use default import syntax: `import <camelCaseName> from './<camelCaseName>.js'`
5. Alphabetically sort both the imports and the array entries in the index file.
