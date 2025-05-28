import * as fs from 'fs';
import { type JSONSchema } from 'json-schema-typed';

import { BgCodeGenProject, BgModelDef, JsonSchemaTask } from '../../types.js';
import getPropertiesForModelDef from './getPropertiesForModelDef.js';
import { GraphqlType, SchemaOutputType } from '../../enums.js'

const doModel = async (
  task: JsonSchemaTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  const modelDef: BgModelDef = task.modelDefs[modelIndex];

  if (
    // Input types don't need a schema:
    modelDef.graphqlType === GraphqlType.InputType ||
    !modelDef.generateJsonSchema
  ) {
    // console.log(`skipping parent class ${modelDef.name}`);
    return 0;
  }

  console.log(`json schema for class ${task.modelDefs[modelIndex].name}`)

  const fileExtension = task.outputType === SchemaOutputType.json
    ? 'json'
    : 'ts';

  const sourceProjects = project.sourceProjects.filter(p => p.jsonSchemaPath);

  if (!Array.isArray(sourceProjects) || sourceProjects.length < 1) {
    return 0;
  }

  const basename = modelDef.name.substring(0, 1).toLowerCase() + modelDef.name.substring(1);
  const outPaths = sourceProjects
    .map(project => `${project.rootPath}/${project.jsonSchemaPath}/${basename}Schema.${fileExtension}`)
    .filter(outPath => outPath);

  if (!Array.isArray(outPaths) || outPaths.length < 1) {
    return 0;
  }

  const schema: JSONSchema = {
    // The following two lines break RxDB:
    // '$schema': 'https://json-schema.org/draft/2020-12/schema',
    // '$id': `${task.schemaIdUrl}/${basename}.schema.json`,
    title: modelDef.name,
    // @ts-ignore: RxDB custom property 'version', not in standard JSONSchema (and JSONSchema is a type, not an interface)
    version: modelDef.version ??  0,
    primaryKey: modelDef.primaryKey ??  'id',
    type: 'object',
    properties: getPropertiesForModelDef(modelDef, [], task),
    required: modelDef.required || ['id']
  };

  let outString: string;

  if (task.outputType === SchemaOutputType.json) {
    outString = JSON.stringify(schema, null, 2);
  } else {
    outString = `export const ${modelDef.name}Schema = ${JSON.stringify(schema, null, 2)};\n`
  }

  for (const outPath of outPaths) {
    try {
      fs.writeFileSync(outPath, outString)
    } catch (error) {
      console.error('jsonSchemaTask.doModel: error writing file', error);
    }
  }

  return 0
}

export default doModel
