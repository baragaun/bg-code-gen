import { BgCodeGenAttributeConfig, BgCodeGenClassConfig } from '../../types.js'
import { GraphqlType } from '../../enums.js'

const getGraphQlType = (dataType: string): string => {
  let s = dataType

  if (dataType.startsWith('boolean')) {
    s = 'Boolean'
  }

  if (dataType.startsWith('date')) {
    s = 'Date'
  }

  if (dataType.startsWith('integer')) {
    s = 'Int'
  }

  if (dataType.startsWith('string')) {
    s = 'String'
  }

  if (dataType.startsWith('id')) {
    // todo: should this here be 'ID'?
    s = 'ID'
  }

  if (s.endsWith('[]')) {
    s = s.substring(0, dataType.length - 2)
  }

  if (dataType.endsWith('[]')) {
    s = '[' + s + ']'
  }

  return s
}

const primitiveDataTypes = [
  'string',
  'id',
  'boolean',
  'integer',
  'float',
]

const getTypescriptType = (dataType: string): string => {
  let s = dataType

  if (s.startsWith('date')) {
    s = 'Date'
  } else if (s.startsWith('integer')) {
    s = 'number'
  } else if (s.startsWith('id')) {
    s = 'string'
  } else {
    return dataType
  }
  return dataType.endsWith('[]') ? s + '[]' : s
}

const getTypescriptTypeText = (attr: BgCodeGenAttributeConfig, isInputType: boolean): string => {
  const optional = attr.optional || isInputType

  if (
    (attr.dataType === 'string' || attr.dataType === 'id') &&
    !attr.optional &&
    !isInputType
  ) {
    return ''
  }

  if (
    primitiveDataTypes.includes(attr.dataType) &&
    attr.default &&
    attr.default !== '' &&
    !attr.optional &&
    !isInputType
  ) {
    return ''
  }

  const typeScriptType = getTypescriptType(attr.dataType)

  return (
    (optional ?  '?:' : ':') +
    ' ' +
    typeScriptType
  )
}

const getDefaultText = (attr: BgCodeGenAttributeConfig, isInputType: boolean): string => {
  if (isInputType) {
    return ''
  }

  if (
    (attr.dataType === 'string' || attr.dataType === 'id') &&
    !attr.optional &&
    !attr.default
  ) {
    return ' = \'\''
  }

  if (attr.default) {
    return ` = ${attr.default}`
  }

  return ''
}

const getClassAttributes = (config: BgCodeGenClassConfig, indentLevel: number): string[] => {
  const isInputType = config.graphqlType === GraphqlType.InputType
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.attr >>Note: Code is generated between these markers<<')

  for (const attr of config.attributes) {
    let gqlOptional = ''

    if (attr.optional || isInputType) {
      gqlOptional = ', { nullable: true }'
    }

    lines.push(prefix + `@Field(_type => ${getGraphQlType(attr.dataType)}${gqlOptional})`)
    if (attr.optional || isInputType) {
      lines.push(prefix + '@IsOptional()')
    }

    let line = prefix + `public ${attr.name}${getTypescriptTypeText(attr, isInputType)}${getDefaultText(attr, isInputType)}\r\n`
    lines.push(line)
  }
  // Removing the double new line of the last attribute:
  lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 2)

  lines.push(prefix + '// @bg-codegen:/class.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getClassAttributes
