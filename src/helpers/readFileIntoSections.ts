import * as fs from 'fs'
import readline from 'readline'

import { FileSection } from '../types.js'

const tags = [
  '@bg-codegen:class.attr',
  '@bg-codegen:class.const.attr',
]

const readFileIntoSections = async (
  path: string,
  tags: string[],
): Promise<FileSection[]> => {
  const sections: FileSection[] = [{ tag: '', lines: [], indent: 0 }]
  let tagIndex = 0
  let sectionIndex = 0

  const fileStream = fs.createReadStream(path)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    if (line.indexOf('@bg-codegen:/') > -1) {
      // This is the last line of the current section
      sections[sectionIndex].lines.push(line)
      tagIndex++
      sectionIndex++
      sections[sectionIndex] = { tag: '', lines: [], indent: 0 }
    } else if (line.indexOf(tags[tagIndex]) > -1) {
      // Start of a new section
      sectionIndex++

      sections[sectionIndex] = {
        tag: tags[tagIndex],
        lines: [line],
        indent: line.search(/\S/),
      }
    } else {
      sections[sectionIndex].lines.push(line)
    }
  }

  return sections
}

export default readFileIntoSections
