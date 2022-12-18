import { BgCodeGenConfig, SyncTypeGraphqlClassesTask } from './types.js'
import handleTypeGraphqlTask from './tasks/handleTypeGraphqlTask/index.js'

const doNextTask = async (config: BgCodeGenConfig, taskIndex: number): Promise<number> => {
  const task = config.tasks[taskIndex]
  let result = 0

  if (task.name === 'sync-type-graphql-class') {
    result = await handleTypeGraphqlTask(task as SyncTypeGraphqlClassesTask)
  }

  if (taskIndex < config.tasks.length - 1) {
    return doNextTask(config, taskIndex + 1)
  }

  return result
}

const codeGen = async (config: BgCodeGenConfig): Promise<number> => {
  console.log('Baragaun Code Generator started.')
  const result = await doNextTask(config, 0)
  console.log('Baragaun Code Generator finised.')
  return result
};

export default codeGen
