import { ModelPropDef } from '../../types.js'

export const getDefaultText = (
  attr: ModelPropDef,
  isOptional: boolean,
  useStringForDate?: boolean,
): string => {
  if (
    attr.dataType.toLowerCase().startsWith('date') &&
    useStringForDate &&
    attr.default === 'new Date()'
  ) {
    return ' = new Date().toISOString()'
  }

  if (
    (attr.dataType.toLowerCase().startsWith('string') || attr.dataType.toLowerCase().startsWith('id')) &&
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
