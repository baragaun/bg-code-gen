import * as fs from 'fs';
import { type JSONSchema } from 'json-schema-typed';

import {
  BgCodeGenProject,
  BgModelDef,
  BgModelDefJsonSchemaTaskConfig,
  JsonSchemaTask
} from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js';
import { GraphqlType, SchemaOutputType } from '../../enums.js'
import { generateTypeScript } from '../../helpers/generateTypeScript/generateTypeScript.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'

const doModel = async (
  task: JsonSchemaTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  const modelDef: BgModelDef = task.modelDefs[modelIndex];

  if (!haveCommonTags(project.tags, modelDef.tags)) {
    return 0
  }

  if (!Array.isArray(modelDef.taskConfigs) || modelDef.taskConfigs.length < 1) {
    return 0
  }

  const taskConfigsForThisTask = modelDef.taskConfigs
    .filter(tc => tc.taskType === task.taskType)

  if (taskConfigsForThisTask.length < 1) {
    return 0;
  }

  const sourceProject = project.sourceProjects
    .find(p => p.name === modelDef.sourceProject)

  if (!sourceProject) {
    console.error(`Source project "${modelDef.sourceProject}" not found`, { task })
    return 0
  }

  if (sourceProject.enabled !== undefined && !sourceProject.enabled) {
    console.log(`Skipping "${modelDef.name}".`)
    return 0
  }

  if (
    // Input types don't need a schema:
    modelDef.graphqlType === GraphqlType.InputType
  ) {
    // console.log(`skipping parent class ${modelDef.name}`);
    return 0;
  }

  console.log(`json schema for class ${task.modelDefs[modelIndex].name}`)

  for (const modelDefTaskConfig of taskConfigsForThisTask) {
    const outSourceProject = project.sourceProjects
      .find(p => p.name === modelDefTaskConfig.sourceProject)

    if (!outSourceProject) {
      console.error(`Source project "${modelDefTaskConfig.sourceProject}" not found`,
        { task })
      continue;
    }

    const outputType = (modelDefTaskConfig as BgModelDefJsonSchemaTaskConfig).outputType
    const path = outSourceProject.rootPath
      ? `${outSourceProject.rootPath}/${modelDefTaskConfig.path}`
      : modelDefTaskConfig.path;

    const schema: JSONSchema = {
      // The following two lines break RxDB:
      // '$schema': 'https://json-schema.org/draft/2020-12/schema',
      // '$id': `${task.schemaIdUrl}/${basename}.schema.json`,
      title: modelDef.name,
      // @ts-ignore: RxDB custom property 'version', not in standard JSONSchema (and JSONSchema is a type, not an interface)
      version: modelDef.version ?? 0,
      primaryKey: modelDef.primaryKey ?? 'id',
      type: 'object',
      properties: getPropertiesForModelDef(modelDef, [], task, modelDefTaskConfig, project),
      required: modelDef.required || ['id']
    };

    let outString: string;

    if (outputType === SchemaOutputType.json) {
      outString = JSON.stringify(schema, null, 2);
    } else {
      outString = await generateTypeScript(
        schema,
        { varName: `${modelDef.name}Schema`, exportType: 'named' },
      );
    }

    try {
      fs.writeFileSync(path, outString)
    } catch (error) {
      console.error('jsonSchemaTask.doModel: error writing file', error);
    }
  }

  return 0
}

export default doModel
