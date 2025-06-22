import {
  BgCodeGenProject,
  JsonSchemaTask,
  ModelClassTask,
  MongooseSchemaTask,
} from './types.js'
import { TaskType } from './enums.js'
import runModelClassTask from './tasks/modelClassTask/modelClassTask.js'
import runJsonSchemaTask from './tasks/jsonSchemaTask/jsonSchemaTask.js'
import runMongooseSchemaTask from './tasks/mongooseSchemaTask/mongooseSchemaTask.js'

const doNextTask = async (
  project: BgCodeGenProject,
  taskIndex: number,
): Promise<number> => {
  const task = project.tasks[taskIndex]
  let result = 0

  if (task.enabled === undefined || task.enabled) {
    if (
      task.taskType === TaskType.modelClass ||
      task.taskType === TaskType.typeGraphql
    ) {
      result = await runModelClassTask(task as ModelClassTask, project);
    } else if (task.taskType === TaskType.jsonSchema) {
      result = await runJsonSchemaTask(task as JsonSchemaTask, project);
    } else if (task.taskType === TaskType.mongooseSchema) {
      result = await runMongooseSchemaTask(task as MongooseSchemaTask, project);
    }
  }

  if (taskIndex < project.tasks.length - 1) {
    return doNextTask(project, taskIndex + 1)
  }

  return result
}

const codeGen = async (config: BgCodeGenProject): Promise<number> => {
  console.log('Baragaun Code Generator started.')
  const result = await doNextTask(config, 0)
  console.log('Baragaun Code Generator finished.')
  return result
};

export default codeGen
