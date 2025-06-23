import { ModelPropDef } from '../../types.js'
import { getTypeScriptType } from './getTypeScriptType.js'

const primitiveDataTypes = [
  'string',
  'id',
  'boolean',
  'integer',
  'float',
]

const getTypeScriptTypeText = (
  attr: ModelPropDef,
  isInputType: boolean,
  isOptional: boolean,
  useStringForDate: boolean,
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

  let typeScriptType = getTypeScriptType(attr, isInputType, useStringForDate)

  if (!typeScriptType) {
    return ''
  }

  return (
    (isOptional ?  '?:' : ':') +
    ' ' +
    typeScriptType
  )
}

export default getTypeScriptTypeText
