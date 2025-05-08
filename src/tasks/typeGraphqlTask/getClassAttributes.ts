import { TypeGraphqlAttr, BgModelDef } from '../../types.js'
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
    s = isInputType ? 'Date' : 'Date'
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

  if (attr.dataType.startsWith('long')) {
    s = 'GraphQlLong'
  }

  if (attr.dataType.startsWith('json')) {
    s = 'GraphQlJson'
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

  if (s === 'date' && isInputType) {
    return 'Date | string | null'
  }

  if (s.startsWith('date')) {
    s = 'Date'
  } else if (s.startsWith('integer') || s.startsWith('float')) {
    s = 'number'
  } else if (s.startsWith('id')) {
    s = 'string'
  } else if (s.startsWith('long') || s.startsWith('GraphQlLong')) {
    s = 'number'
  } else if (s.startsWith('json') || s.startsWith('GraphQlJson')) {
    s = 'object'
  // } else {
  //   return attr.dataType
  }

  if (attr.dataType.endsWith('[]') && !s.endsWith('[]')) {
    s += '[]'
  }

  if (
    (attr.orNull || attr.optional || isInputType) &&
    attr.orNull !== false &&
    attr.optional !== false
  ) {
    s += ' | null'
  } else {
    if (
        (attr.dataType === 'string' || attr.dataType === 'id') &&
        (attr.default || !attr.optional) &&
        (!isInputType || attr.optional === false)
      ) {
        return ''
      }
  }

  return s
}

const getTypescriptTypeText = (
  attr: TypeGraphqlAttr,
  isInputType: boolean,
  isOptional: boolean,
): string => {
  if (
    primitiveDataTypes.includes(attr.dataType) &&
    attr.default &&
    attr.default !== '' &&
    !isOptional &&
    !attr.orNull
  ) {
    return ''
  }

  let typeScriptType = getTypescriptType(attr, isInputType)

  if (!typeScriptType) {
    return ''
  }

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

const getClassAttributes = (config: BgModelDef, indentLevel: number): string[] => {
  const isInputType = config.graphqlType === GraphqlType.InputType
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.attr >>Note: Code is generated between these markers<<')

  for (const attr of config.attributes) {
    const fieldDecoratorOptions: string[] = []

    if (attr.comment) {
      if (attr.comment.startsWith('//')) {
        lines.push(prefix + attr.comment)
      } else {
        lines.push(prefix + '// ' + attr.comment)
      }
    }

    if (config.isTypeOrmModel && !isInputType) {
      if (attr.isPrimaryKeyField) {
        lines.push(prefix + '@ObjectIdColumn()')
      } else {
        lines.push(prefix + '@Column()')
      }
    }

    let isOptional = (
      (
        (isInputType && !attr.default) ||
        (!isInputType && !!attr.optional)
      ) &&
      attr.optional !== false
    )

    if (isOptional) {
      fieldDecoratorOptions.push('nullable: true')
    }

    if (attr.description) {
      fieldDecoratorOptions.push(`description: '${attr.description}'`)
    }

    if (attr.deprecationReason) {
      fieldDecoratorOptions.push(`deprecationReason: '${attr.deprecationReason}'`)
    }

    const fieldDecoratorOptionsArg = fieldDecoratorOptions.length > 0
      ? `, {\n${prefix}${prefix}${fieldDecoratorOptions.join(`,\n${prefix}${prefix}`)},\n${prefix}}`
      : ''

    if (config.graphqlType && attr.exposeToGraphQl !== false) {
      // GraphQL @Field tag:
      lines.push(prefix + `@Field(_type => ${getGqlType(attr, isInputType)}${fieldDecoratorOptionsArg})`)
      if (isOptional || attr.addOptionalDecorator) {
        lines.push(prefix + '@IsOptional()')
      }
    }

    // Variable declaration:
    const typescriptText = getTypescriptTypeText(attr, isInputType, isOptional)
    const defaultText = getDefaultText(attr, isOptional)
    lines.push(prefix + `public ${attr.name}${typescriptText}${defaultText}` + (config.graphqlType ? "\n" : ''))
  }
  if (config.graphqlType && config.attributes.length > 0) {
    // Removing the double new line of the last attribute:
    lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 1)
  }

  lines.push(prefix + '// @bg-codegen:/class.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getClassAttributes
