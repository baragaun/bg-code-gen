import { BgCodeGenProject, TypeGraphqlTask } from './types.js'
import { TaskType } from './enums.js'
import runTypeGraphqlTask from './tasks/typeGraphqlTask/index.js'

const doNextTask = async (config: BgCodeGenProject, taskIndex: number): Promise<number> => {
  const task = config.tasks[taskIndex]
  let result = 0

  if (task.active) {
    if (task.taskType === TaskType.SYNC_TYPE_GRAPHQL_CLASS) {
      result = await runTypeGraphqlTask(task as TypeGraphqlTask)
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
