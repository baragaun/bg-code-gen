import { TypeGraphqlClass } from '../../../../types.js'
import { GraphqlType } from '../../../../enums.js'

const baseModel: TypeGraphqlClass = {
  name: 'BaseModel',
  graphqlType: GraphqlType.ObjectType,
  path: '/src/services/models/types/BaseModel.ts',
  active: true,
  attributes: [
    { name: 'id', dataType: 'id' },
    { name: 'modelType', dataType: 'ModelType' },
    { name: 'adminNotes', dataType: 'string', optional: true },
    { name: 'metadata', dataType: 'BaseModelMetadata', optional: true },
    { name: 'createdAt', dataType: 'Date', default: 'new Date()' },
    { name: 'updatedAt', dataType: 'Date', optional: true },
    { name: 'deletedAt', dataType: 'Date', optional: true },
    { name: 'updatedBy', dataType: 'string', optional: true },
  ]
}

export default baseModel
