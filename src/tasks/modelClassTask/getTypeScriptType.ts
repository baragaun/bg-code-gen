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

  if (s.match(/^date(\[\])?$/i) && useStringForDate) {
    s = 'string'
  } else if (s.match(/^date(\[\])?( \| null)?$/i) && !useStringForDate) {
    s = 'Date'
  } else if (s.match(/^integer(\[\])?( \| null)?$/i) || s.match(/float(\[\])?/i)) {
    s = 'number'
  } else if (s.match(/^id(\[\])?( \| null)?$/i)) {
    s = 'string'
  } else if (s.match(/^long(\[\])?( \| null)?$/i) || s.match(/graphqllong(\[\])?/i)) {
    s = 'number'
  } else if (s.match(/^json(\[\])?( \| null)?$/i) || s.match(/graphqljson(\[\])?/i)) {
    s = 'object'
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
          attr.dataType.toLowerCase() === 'string' ||
          attr.dataType.toLowerCase() === 'id' ||
          (s.toLocaleString() === 'date' && useStringForDate)
        ) &&
        (attr.default || !attr.optional) &&
        (!isInputType || attr.optional === false)
      ) {
        return ''
      }
  }

  return s
}
