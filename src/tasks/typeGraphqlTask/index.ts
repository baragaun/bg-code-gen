import { TypeGraphqlTask } from '../../types.js'
import syncTypeGraphqlClass from './syncTypeGraphqlClass.js'

const doNextClass = async (task: TypeGraphqlTask, classIndex: number): Promise<number> => {
  let result = 0
  if (task.classes[classIndex].active && task.classes[classIndex].path) {
    console.log(`syncing class ${task.classes[classIndex].name}`)
    result = await syncTypeGraphqlClass(task.classes[classIndex])
  } else {
    console.log(`skipping class ${task.classes[classIndex].name}`)
  }

  if (classIndex < task.classes.length - 1) {
    return doNextClass(task, classIndex + 1)
  }

  return result
}

const typeGraphqlTask = async (task: TypeGraphqlTask): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)
  return doNextClass(task, 0)
}

export default typeGraphqlTask
