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

const getTypescriptTypeText = (attr: BgCodeGenAttributeConfig, isOptional: boolean): string => {
  if (
    (attr.dataType === 'string' || attr.dataType === 'id') &&
    !isOptional
  ) {
    return ''
  }

  if (
    primitiveDataTypes.includes(attr.dataType) &&
    attr.default &&
    attr.default !== '' &&
    !isOptional
  ) {
    return ''
  }

  const typeScriptType = getTypescriptType(attr.dataType)

  return (
    (isOptional ?  '?:' : ':') +
    ' ' +
    typeScriptType
  )
}

const getDefaultText = (attr: BgCodeGenAttributeConfig, isOptional: boolean): string => {
  if (
    (attr.dataType === 'string' || attr.dataType === 'id') &&
    !isOptional &&
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
    let isOptional = (
      (
        (isInputType && !attr.default) ||
        (!isInputType && !!attr.optional)
      ) &&
      attr.optional !== false
    )
    let gqlOptional = isOptional ? ', { nullable: true }' : ''

    // GraphQL @Field tag:
    lines.push(prefix + `@Field(_type => ${getGraphQlType(attr.dataType)}${gqlOptional})`)
    if (isOptional) {
      lines.push(prefix + '@IsOptional()')
    }

    // Variable declaration:
    const typescriptText = getTypescriptTypeText(attr, isOptional)
    const defaultText = getDefaultText(attr, isOptional)
    lines.push(prefix + `public ${attr.name}${typescriptText}${defaultText}\r\n`)
  }
  // Removing the double new line of the last attribute:
  lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 2)

  lines.push(prefix + '// @bg-codegen:/class.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getClassAttributes
