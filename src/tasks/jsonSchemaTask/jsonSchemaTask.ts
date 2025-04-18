import { BgCodeGenProject, JsonSchemaTask } from '../../types.js'
import doModel from './doModel.js'
import fetchGraphqlSchema from '../../helpers/fetchGraphqlSchema.js'
import getEnumsFromGraphqlSchema from '../../helpers/getEnumsFromGraphqlSchema.js'

const doNextModel = async (
  task: JsonSchemaTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  let result = 0
  result = await doModel(task, project, modelIndex);

  if (modelIndex < task.modelDefs.length - 1) {
    return doNextModel(task, project, modelIndex + 1);
  }

  return result
}

const jsonSchemaTask = async (
  task: JsonSchemaTask,
  project: BgCodeGenProject,
): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)

  if ((!Array.isArray(task.enumInfos) || task.enumInfos.length < 1) && task.graphqlUrl) {
    const grapqlSchema = await fetchGraphqlSchema(task.graphqlUrl);
    task.enumInfos = getEnumsFromGraphqlSchema(grapqlSchema);
  }

  return doNextModel(task, project, 0);
}

export default jsonSchemaTask
