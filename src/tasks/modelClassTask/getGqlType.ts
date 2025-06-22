import { ModelPropDef } from '../../types.js'

export const getGqlType = (attr: ModelPropDef, isInputType: boolean): string => {
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
