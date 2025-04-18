import * as fs from 'fs'

import { BgCodeGenProject, BgModelDef, TypeGraphqlTask } from '../../types.js'
import readFileIntoSections from '../../helpers/readFileIntoSections.js'
import getClassAttributes from './getClassAttributes.js'
import getAttributeOverwrites from './getAttributeOverwrites.js'

const doModel = async (
  task: TypeGraphqlTask,
  project: BgCodeGenProject,
  modelIndex: number,
): Promise<number> => {
  const modelDef: BgModelDef = task.modelDefs[modelIndex]

  if (!modelDef.classFilePath) {
    return 0
  }

  const sourceProject = project.sourceProjects.find(p => p.name === modelDef.sourceProject)

  if (!sourceProject) {
    console.error(`Source project "${modelDef.sourceProject}" not found`, { task })
    return 0
  }

  if (sourceProject.enabled !== undefined && !sourceProject.enabled) {
    console.log(`Skipping "${modelDef.name}".`)
    return 0
  }

  const path = sourceProject.rootPath
    ? `${sourceProject.rootPath}/${modelDef.classFilePath}`
    : modelDef.classFilePath;

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
      outLines = outLines.concat(getClassAttributes(modelDef, section.indent))
    } else if (section.tag === '@bg-codegen:class.const.attr') {
      outLines = outLines.concat(getAttributeOverwrites(modelDef, section.indent))
    } else {
      outLines = outLines.concat(section.lines)
    }
  }

  fs.writeFileSync(path, outLines.join('\n') + '\n')

  return 0
}

export default doModel
