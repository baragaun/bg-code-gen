import { JsonSchemaTask } from '../../types.js'
import doModel from './doModel.js'

const doNextClass = async (
  task: JsonSchemaTask,
  classIndex: number,
): Promise<number> => {
  let result = 0
  if (task.models[classIndex].active && task.models[classIndex].schemaPath) {
    console.log(`schema for class ${task.models[classIndex].name}`)
    result = await doModel(task, classIndex)
  } else {
    console.log(`skipping class ${task.models[classIndex].name}`)
  }

  if (classIndex < task.models.length - 1) {
    return doNextClass(task, classIndex + 1)
  }

  return result
}

const jsonSchemaTask = async (task: JsonSchemaTask): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)
  return doNextClass(task, 0)
}

export default jsonSchemaTask
