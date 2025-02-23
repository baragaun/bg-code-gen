import * as fs from 'fs'

import { TypeGraphqlClass, JsonSchemaTask } from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js'

const doModel = async (
  task: JsonSchemaTask,
  modelIndex: number,
): Promise<number> => {
  const modelDef: TypeGraphqlClass = task.models[modelIndex]

  if (!modelDef.schemaPath) {
    return 0
  }

  const outPath = task.projectRoot
    ? `${task.projectRoot}/${modelDef.schemaPath}`
    : modelDef.schemaPath

  if (!outPath) {
    return 0
  }

  const schema: any = {
    version: modelDef.version ??  0,
    primaryKey: modelDef.primaryKey ??  'id',
    type: 'object',
    properties: getPropertiesForModelDef(modelDef, task),
    required: modelDef.required || ['id']
  };

  let outString: string;

  if (outPath.endsWith('.ts')) {
    outString = `export const ${modelDef.name}Schema = ${JSON.stringify(schema, null, 2)};\n`
  } else {
    outString = JSON.stringify(schema, null, 2);
  }

  fs.writeFileSync(outPath, outString)

  return 0
}

export default doModel
