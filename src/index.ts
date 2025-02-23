import { BgCodeGenProject, JsonSchemaTask, TypeGraphqlTask } from './types.js'
import { TaskType } from './enums.js'
import runTypeGraphqlTask from './tasks/typeGraphqlTask/typeGraphqlTask.js'
import runCreateSchemaTask from './tasks/jsonSchemaTask/jsonSchemaTask.js'

const doNextTask = async (
  config: BgCodeGenProject,
  taskIndex: number,
): Promise<number> => {
  const task = config.tasks[taskIndex]
  let result = 0

  if (task.active) {
    if (task.taskType === TaskType.typeGraphql) {
      result = await runTypeGraphqlTask(task as TypeGraphqlTask)
    } else if (task.taskType === TaskType.jsonSchema) {
      result = await runCreateSchemaTask(task as JsonSchemaTask)
    }
  }

  if (taskIndex < config.tasks.length - 1) {
    return doNextTask(config, taskIndex + 1)
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
