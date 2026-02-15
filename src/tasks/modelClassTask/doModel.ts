import * as fs from 'fs'

import { BgCodeGenProject, BgModelDef, ModelClassTask } from '../../types.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'
import readFileIntoSections from '../../helpers/readFileIntoSections.js'
import getClassAttributes from './getClassAttributes.js'
import getPropAssignments from './getPropAssignments.js'

const doModel = async (
  task: ModelClassTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  const modelDef: BgModelDef = task.modelDefs[modelIndex];

  if (!haveCommonTags(project.tags, modelDef.tags)) {
    return 0
  }

  if (!Array.isArray(modelDef.taskConfigs) || modelDef.taskConfigs.length < 1) {
    return 0
  }

  const taskConfigsForThisTask = modelDef.taskConfigs
    .filter(tc => tc.taskType === task.taskType)

  if (taskConfigsForThisTask.length < 1) {
    return 0;
  }

  const sourceProject = project.sourceProjects
    .find(p => p.name === modelDef.sourceProject)

  if (!sourceProject) {
    // console.log(`Source project "${modelDef.sourceProject}" not found`)
    return 0
  }

  if (sourceProject.enabled !== undefined && !sourceProject.enabled) {
    console.log(`Skipping "${modelDef.name}".`)
    return 0
  }

  for (const modelDefTaskConfig of taskConfigsForThisTask) {
    const outSourceProject = project.sourceProjects
      .find(p => p.name === modelDefTaskConfig.sourceProject)

    if (!outSourceProject) {
      console.log(`Source project "${modelDefTaskConfig.sourceProject}" not found`)
      continue;
    }

    const path = outSourceProject.rootPath
      ? `${outSourceProject.rootPath}/${modelDefTaskConfig.path}`
      : modelDefTaskConfig.path;

    if (
      modelDef.backUpFiles ||
      (process.env.BACK_UP_FILES && ['yes', '1', 'true'].includes(process.env.BACK_UP_FILES.toLowerCase()))
    ) {
      fs.copyFileSync(path, path + '.backup')
    }

    let outLines: string[] = []
    const sections = await readFileIntoSections(
      path,
      [
        '@bg-codegen:class.attr',
        '@bg-codegen:class.const.attr',
      ],
    )

    for (const section of sections) {
      if (section.tag === '@bg-codegen:class.attr') {
        outLines = outLines.concat(getClassAttributes(
          modelDef,
          task,
          modelDefTaskConfig,
          outSourceProject,
          project,
          section.indent,
        ))
      } else if (section.tag === '@bg-codegen:class.const.attr') {
        outLines = outLines.concat(getPropAssignments(
          modelDef,
          task,
          modelDefTaskConfig,
          outSourceProject,
          project,
          section.indent,
        ))
      } else {
        outLines = outLines.concat(section.lines)
      }
    }

    fs.writeFileSync(path, outLines.join('\n') + '\n')
  }

  return 0
}

export default doModel
