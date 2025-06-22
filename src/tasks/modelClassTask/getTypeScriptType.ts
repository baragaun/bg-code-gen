import { ModelPropDef } from '../../types.js'

export const getTypeScriptType = (
  attr: ModelPropDef,
  isInputType: boolean,
  useStringForDate: boolean,
): string => {
  let s = attr.dataType

  if (s === 'date' && isInputType) {
    return 'Date | string | null'
  }

  if (s.toLocaleString().startsWith('date') && useStringForDate) {
    s = 'string'
  } else if (s.toLocaleString().startsWith('date') && !useStringForDate) {
    s = 'Date'
  } else if (s.toLowerCase().startsWith('integer') || s.startsWith('float')) {
    s = 'number'
  } else if (s.toLowerCase().startsWith('id')) {
    s = 'string'
  } else if (s.toLowerCase().startsWith('long') || s.toLowerCase().startsWith('graphqllong')) {
    s = 'number'
  } else if (s.toLowerCase().startsWith('json') || s.toLowerCase().startsWith('graphqljson')) {
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
        (
          attr.dataType.toLowerCase().startsWith('string') ||
          attr.dataType.toLowerCase().startsWith('id') ||
          (s.toLocaleString().startsWith('date') && useStringForDate)
        ) &&
        (attr.default || !attr.optional) &&
        (!isInputType || attr.optional === false)
      ) {
        return ''
      }
  }

  return s
}
