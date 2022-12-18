import { BgCodeGenClassConfig } from '../../types.js'

const getAttributeOverwrites = (config: BgCodeGenClassConfig, ident: number): string[] => {
  let lines: string[] = []
  const prefix = '                          '.substring(0, ident)

  lines.push(prefix + '// @bg-codegen:class.const.attr')
  lines.push(prefix + '>>>>>>here goes @bg-codegen:class.const.attr')
  lines.push(prefix + '// @bg-codegen:/class.const.attr')

  return lines
}

export default getAttributeOverwrites
