import { BgCodeGenProject, TypeGraphqlTask } from '../../types.js'
import doModel from './doModel.js'

const doNextClass = async (
  task: TypeGraphqlTask,
  project: BgCodeGenProject,
  classIndex: number
): Promise<number> => {
  let result = 0
  if (task.modelDefs[classIndex].classFilePath) {
    console.log(`syncing class ${task.modelDefs[classIndex].name}`)
    result = await doModel(task, project, classIndex)
  } else {
    console.log(`skipping class ${task.modelDefs[classIndex].name}`)
  }

  if (classIndex < task.modelDefs.length - 1) {
    return doNextClass(task, project, classIndex + 1)
  }

  return result
}

const typeGraphqlTask = async (
  task: TypeGraphqlTask,
  project: BgCodeGenProject,
): Promise<number> => {
  console.log(`Executing task ${task.taskType}`)
  return doNextClass(task, project, 0);
}

export default typeGraphqlTask
