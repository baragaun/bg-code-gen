import { BgCodeGenProject, MongooseSchemaTask } from '../../types.js'
import doModel from './doModel.js'

const doNextModel = async (
  task: MongooseSchemaTask,
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

const mongooseSchemaTask = async (
  task: MongooseSchemaTask,
  project: BgCodeGenProject,
): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)

  return doNextModel(task, project, 0);
}

export default mongooseSchemaTask
