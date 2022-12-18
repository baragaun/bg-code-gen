import { BgCodeGenAttributeConfig, BgCodeGenClassConfig } from '../../types.js'

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

  if (s.endsWith('[]')) {
    s = s.substring(0, dataType.length - 2)
  }

  if (dataType.endsWith('[]')) {
    s = '[' + s + ']'
  }

  return s
}

const getTypescriptType = (dataType: string): string => {
  if (dataType === 'date') {
    return 'Date'
  }
  if (dataType === 'integer') {
    return 'number'
  }
  return dataType
}

const primitiveDataTypes = [
  'string',
  'boolean',
  'integer',
  'float',
]

const getTypescriptTypeText = (attr: BgCodeGenAttributeConfig): string => {
  if (attr.dataType === 'string' && !attr.default) {
    return ''
  }

  if (
    primitiveDataTypes.includes(attr.dataType) &&
    attr.default &&
    attr.default !== ''
  ) {
    return ''
  }
  const typeScriptType = getTypescriptType(attr.dataType)

  return (
    (attr.optional ?  '?:' : ':') +
    ' ' +
    typeScriptType
  )
}

const getDefaultText = (attr: BgCodeGenAttributeConfig): string => {
  if (attr.dataType === 'string' && !attr.default) {
    return ' = \'\''
  }

  if (attr.default) {
    return ` = ${attr.default}`
  }

  return ''
}

const getClassAttributes = (config: BgCodeGenClassConfig, ident: number): string[] => {
  let lines: string[] = []
  const prefix = '                          '.substring(0, ident)

  lines.push(prefix + '// @bg-codegen:class.attr')

  for (const attr of config.attributes) {
    let gqlOptional = ''

    if (attr.optional) {
      gqlOptional = ', { nullable: true }'
    }

    lines.push(prefix + `@Field(_type => ${getGraphQlType(attr.dataType)}${gqlOptional})`)
    if (attr.optional) {
      lines.push(prefix + '@IsOptional()')
    }

    let line = prefix + `public ${attr.name}${getTypescriptTypeText(attr)}${getDefaultText(attr)}\r\n`
    lines.push(line)
  }

  lines.push(prefix + '// @bg-codegen:/class.attr')

  return lines
}

export default getClassAttributes
