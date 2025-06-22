import { BgCodeGenProject, ModelClassTask } from '../../types.js'
import doModel from './doModel.js'

const doNextClass = async (
  task: ModelClassTask,
  project: BgCodeGenProject,
  classIndex: number
): Promise<number> => {
  let result = 0
  console.log(`syncing class ${task.modelDefs[classIndex].name}`)
  result = await doModel(task, project, classIndex)

  if (classIndex < task.modelDefs.length - 1) {
    return doNextClass(task, project, classIndex + 1)
  }

  return result
}

const modelClassTask = async (
  task: ModelClassTask,
  project: BgCodeGenProject,
): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)
  return doNextClass(task, project, 0);
}

export default modelClassTask
