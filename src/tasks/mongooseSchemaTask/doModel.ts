import * as fs from 'fs';

import { BgCodeGenProject, BgModelDef, JsonSchemaTask } from '../../types.js';
import getPropertiesForModelDef from './getPropertiesForModelDef.js';
import { GraphqlType } from '../../enums.js'
import extractImports from '../../helpers/extractImports.js'

const HEADER =`import mongoose from 'mongoose';

const { Schema } = mongoose;

`

const doModel = async (
  task: JsonSchemaTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  const modelDef: BgModelDef = task.modelDefs[modelIndex];

  if (
    // Input types don't need a schema:
    modelDef.graphqlType === GraphqlType.InputType ||
    !modelDef.dbCollectionName ||
    modelDef.generateJsonSchema === false
  ) {
    // console.log(`skipping parent class ${modelDef.name}`);
    return 0;
  }

  console.log(`mongoose schema for class ${task.modelDefs[modelIndex].name}`)
  const sourceProjects = project.sourceProjects.filter(p => p.mongooseSchemaPath);

  if (!Array.isArray(sourceProjects) || sourceProjects.length < 1) {
    return 0;
  }

  const basename = modelDef.name.substring(0, 1).toLowerCase() + modelDef.name.substring(1);
  let outString = `export const ${basename}Schema = new Schema({` + '\n';

  const outPaths = sourceProjects
    .map(project => `${project.rootPath}/${project.mongooseSchemaPath}/${basename}.ts`)
    .filter(outPath => outPath);

  if (!Array.isArray(outPaths) || outPaths.length < 1) {
    return 0;
  }

  const properties = getPropertiesForModelDef(modelDef, [], 0, task)

  outString += properties.join(',\n') + ',\n}, { collection: \'' + modelDef.dbCollectionName + '\' });\n';

  for (const outPath of outPaths) {
    let header = HEADER;
    try {
      if (fs.existsSync(outPath)) {
        const imports = extractImports(outPath);
        if (imports) {
          header = imports + '\n\nconst { Schema } = mongoose;\n\n';
        }
      }
      fs.writeFileSync(outPath, header + outString)
    } catch (error) {
      console.error('jsonSchemaTask.doModel: error writing file', error);
    }
  }

  return 0
}

export default doModel
