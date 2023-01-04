import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseModelInput: TypeGraphqlClass = {
  name: 'BaseModelInput',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/models/types/BaseModelInput.ts',
  active: true,
  attributes: [
    { name: 'id', dataType: 'id' },
    { name: 'modelType', dataType: 'ModelType' },
    { name: 'adminNotes', dataType: 'string' },
    { name: 'metadata', dataType: 'BaseModelMetadataInput' },
    { name: 'createdAt', dataType: 'Date' },
    { name: 'updatedAt', dataType: 'Date' },
    { name: 'deletedAt', dataType: 'Date' },
    { name: 'createdBy', dataType: 'id' },
    { name: 'updatedBy', dataType: 'id' },
  ]
}

export default baseModelInput
