import { TypeGraphqlAttr, TypeGraphqlClass } from '../../types.js'
import { GraphqlType } from '../../enums.js'

const getGqlType = (attr: TypeGraphqlAttr, isInputType: boolean): string => {
  if (attr.gqlType) {
    return attr.gqlType
  }

  let s = attr.dataType

  if (attr.dataType.startsWith('boolean')) {
    s = 'Boolean'
  }

  if (attr.dataType.startsWith('date')) {
    s = isInputType ? 'String' : 'Date'
  }

  if (attr.dataType.startsWith('float')) {
    s = 'Float'
  }

  if (attr.dataType.startsWith('integer')) {
    s = 'Int'
  }

  if (attr.dataType.startsWith('string')) {
    s = 'String'
  }

  if (attr.dataType.startsWith('id')) {
    // todo: should this here be 'ID'?
    s = 'ID'
  }

  if (s.endsWith('[]')) {
    s = s.substring(0, attr.dataType.length - 2)
  }

  if (attr.dataType.endsWith('[]')) {
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

const getTypescriptType = (attr: TypeGraphqlAttr, isInputType: boolean): string => {
  let s = attr.dataType
  let orNull = false

  if (s === 'date' && isInputType) {
    return 'Date | string | null'
  }

  if (s.startsWith('date')) {
    s = 'Date'
    orNull = isInputType
  } else if (s.startsWith('integer') || s.startsWith('float')) {
    s = 'number'
  } else if (s.startsWith('id')) {
    s = 'string'
  // } else {
  //   return attr.dataType
  }

  if (attr.dataType.endsWith('[]') && !s.endsWith('[]')) {
    s += '[]'
  }

  if (orNull) {
    s += ' | null'
  }

  return s
}

const getTypescriptTypeText = (attr: TypeGraphqlAttr, isInputType: boolean, isOptional: boolean): string => {
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

  const typeScriptType = getTypescriptType(attr, isInputType)

  return (
    (isOptional ?  '?:' : ':') +
    ' ' +
    typeScriptType
  )
}

const getDefaultText = (attr: TypeGraphqlAttr, isOptional: boolean): string => {
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

const getClassAttributes = (config: TypeGraphqlClass, indentLevel: number): string[] => {
  const isInputType = config.graphqlType === GraphqlType.InputType
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.attr >>Note: Code is generated between these markers<<')

  for (const attr of config.attributes) {
    if (attr.comment) {
      lines.push(prefix + attr.comment)
    }
    let isOptional = (
      (
        (isInputType && !attr.default) ||
        (!isInputType && !!attr.optional)
      ) &&
      attr.optional !== false
    )
    let gqlOptional = isOptional ? ', { nullable: true }' : ''

    if (attr.exposeToGraphQl !== false) {
      // GraphQL @Field tag:
      lines.push(prefix + `@Field(_type => ${getGqlType(attr, isInputType)}${gqlOptional})`)
      if (isOptional || attr.addOptionalDecorator) {
        lines.push(prefix + '@IsOptional()')
      }
    }

    // Variable declaration:
    const typescriptText = getTypescriptTypeText(attr, isInputType, isOptional)
    const defaultText = getDefaultText(attr, isOptional)
    lines.push(prefix + `public ${attr.name}${typescriptText}${defaultText}\n`)
  }
  if (config.attributes.length > 0) {
    // Removing the double new line of the last attribute:
    lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 1)
  }

  lines.push(prefix + '// @bg-codegen:/class.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getClassAttributes
