import { SyncTypeGraphqlClassesTask } from '../../types.js'
import syncTypeGraphqlClass from './syncTypeGraphqlClass.js'

const doNextClass = async (task: SyncTypeGraphqlClassesTask, classIndex: number): Promise<number> => {
  const result = await syncTypeGraphqlClass(task.classes[classIndex])

  if (classIndex < task.classes.length - 1) {
    return doNextClass(task, classIndex + 1)
  }

  return result
}

const typeGraphqlTask = async (task: SyncTypeGraphqlClassesTask): Promise<number> => {
  return doNextClass(task, 0)
}

export default typeGraphqlTask
