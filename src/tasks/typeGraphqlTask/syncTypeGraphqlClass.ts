import * as fs from 'fs'

import { TypeGraphqlClass } from '../../types.js'
import readFileIntoSections from '../../helpers/readFileIntoSections.js'
import getClassAttributes from './getClassAttributes.js'
import getAttributeOverwrites from './getAttributeOverwrites.js'

const syncTypeGraphqlClass = async (
  task: TypeGraphqlClass,
): Promise<number> => {
  if (!task.path) {
    return 0
  }
  if (
    task.backUpFiles ||
    (process.env.BACK_UP_FILES && ['yes', '1', 'true'].includes(process.env.BACK_UP_FILES.toLowerCase()))
  ) {
    fs.copyFileSync(task.path, task.path + '.backup')
  }

  let outLines: string[] = []
  const sections = await readFileIntoSections(
    task.path,
    [
      '@bg-codegen:class.attr',
      '@bg-codegen:class.const.attr',
    ],
  )

  for (const section of sections) {
    if (section.tag === '@bg-codegen:class.attr') {
      outLines = outLines.concat(getClassAttributes(task, section.indent))
    } else if (section.tag === '@bg-codegen:class.const.attr') {
      outLines = outLines.concat(getAttributeOverwrites(task, section.indent))
    } else {
      outLines = outLines.concat(section.lines)
    }
  }

  fs.writeFileSync(task.path, outLines.join('\r\n') + '\r\n')

  return 0
}

export default syncTypeGraphqlClass
