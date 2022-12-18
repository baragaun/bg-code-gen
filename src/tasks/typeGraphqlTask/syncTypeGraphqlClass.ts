import * as fs from 'fs'

import { BgCodeGenClassConfig } from '../../types.js'
import readFileIntoSections from '../../helpers/readFileIntoSections.js'
import getClassAttributes from './getClassAttributes.js'
import getAttributeOverwrites from './getAttributeOverwrites.js'

const syncTypeGraphqlClass = async (
  config: BgCodeGenClassConfig,
): Promise<number> => {
  if (!config.path) {
    return 0
  }
  if (process.env.BACK_UP_FILES && ['yes', '1', 'true'].includes(process.env.BACK_UP_FILES.toLowerCase())) {
    fs.copyFileSync(config.path, config.path + '.backup')
  }

  let outLines: string[] = []
  const sections = await readFileIntoSections(
    config.path,
    [
      '@bg-codegen:class.attr',
      '@bg-codegen:class.const.attr',
    ],
  )

  for (const section of sections) {
    if (section.tag === '@bg-codegen:class.attr') {
      outLines = outLines.concat(getClassAttributes(config, section.indent))
    } else if (section.tag === '@bg-codegen:class.const.attr') {
      outLines = outLines.concat(getAttributeOverwrites(config, section.indent))
    } else {
      outLines = outLines.concat(section.lines)
    }
  }

  fs.writeFileSync(config.path, outLines.join('\r\n') + '\r\n')

  return 0
}

export default syncTypeGraphqlClass
