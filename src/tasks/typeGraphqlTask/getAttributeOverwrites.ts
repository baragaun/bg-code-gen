import { TypeGraphqlClass } from '../../types.js'

const getAttributeOverwrites = (config: TypeGraphqlClass, indentLevel: number): string[] => {
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.const.attr >>Note: Code is generated between these markers<<')

  for (const attr of config.attributes) {
    if (attr.dataType === 'boolean') {
      lines.push(prefix + `if (attributes.${attr.name} === true || attributes.${attr.name} === false) {`)
    } else {
      lines.push(prefix + `if (attributes.${attr.name}) {`)
    }
    lines.push(prefix + `  this.${attr.name} = attributes.${attr.name}`)
    lines.push(prefix + `}`)
  }

  lines.push(prefix + '// @bg-codegen:/class.const.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getAttributeOverwrites
