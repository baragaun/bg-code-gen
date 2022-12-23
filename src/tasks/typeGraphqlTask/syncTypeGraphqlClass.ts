import * as fs from 'fs'

import { TypeGraphqlClass, TypeGraphqlTask } from '../../types.js'
import readFileIntoSections from '../../helpers/readFileIntoSections.js'
import getClassAttributes from './getClassAttributes.js'
import getAttributeOverwrites from './getAttributeOverwrites.js'

const syncTypeGraphqlClass = async (task: TypeGraphqlTask, classIndex: number): Promise<number> => {
  const graphqlClass: TypeGraphqlClass = task.classes[classIndex]
  if (!graphqlClass.path) {
    return 0
  }
  const path = (task.projectRoot || '') + graphqlClass.path
  if (
    graphqlClass.backUpFiles ||
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
      outLines = outLines.concat(getClassAttributes(graphqlClass, section.indent))
    } else if (section.tag === '@bg-codegen:class.const.attr') {
      outLines = outLines.concat(getAttributeOverwrites(graphqlClass, section.indent))
    } else {
      outLines = outLines.concat(section.lines)
    }
  }

  fs.writeFileSync(path, outLines.join('\n') + '\n')

  return 0
}

export default syncTypeGraphqlClass
