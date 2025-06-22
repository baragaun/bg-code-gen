import * as fs from 'fs';

import { BgCodeGenProject, BgModelDef, JsonSchemaTask } from '../../types.js';
import getPropertiesForModelDef from './getPropertiesForModelDef.js';
import { GraphqlType } from '../../enums.js'
import extractImports from '../../helpers/extractImports.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'

const HEADER =`import mongoose from 'mongoose';

const { Schema } = mongoose;

`

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
    modelDef.graphqlType === GraphqlType.InputType ||
    !modelDef.dbCollectionName
  ) {
    // console.log(`skipping parent class ${modelDef.name}`);
    return 0;
  }

  console.log(`mongoose schema for class ${task.modelDefs[modelIndex].name}`)

  for (const modelDefTaskConfig of taskConfigsForThisTask) {
    const outSourceProject = project.sourceProjects
      .find(p => p.name === modelDefTaskConfig.sourceProject)

    if (!outSourceProject) {
      console.error(`Source project "${modelDefTaskConfig.sourceProject}" not found`,
        { task })
      continue;
    }

    const basename = modelDef.name.substring(0, 1).toLowerCase() + modelDef.name.substring(1);
    let outString = `export const ${basename}Schema = new Schema({` + '\n';

    const props = getPropertiesForModelDef(modelDef, [], 0, task, modelDefTaskConfig, project)
    outString += props.join(',\n') + ',\n}, { collection: \'' + modelDef.dbCollectionName + '\' });\n';

    const path = outSourceProject.rootPath
      ? `${outSourceProject.rootPath}/${modelDefTaskConfig.path}`
      : modelDefTaskConfig.path;

    let header = HEADER;
    try {
      if (fs.existsSync(path)) {
        const imports = extractImports(path);
        if (imports) {
          header = imports + '\n\nconst { Schema } = mongoose;\n\n';
        }
      }
      fs.writeFileSync(path, header + outString)
    } catch (error) {
      console.error('jsonSchemaTask.doModel: error writing file', error);
    }
  }

  return 0
}

export default doModel
