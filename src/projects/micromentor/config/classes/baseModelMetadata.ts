import { TypeGraphqlClass } from '../../../../types.js'
import { GraphqlType } from '../../../../enums.js'

const baseModelMetadata: TypeGraphqlClass = {
  name: 'BaseModelMetadata',
  graphqlType: GraphqlType.ObjectType,
  // extends: 'BaseModel',
  path: '/src/services/models/types/BaseModelMetadata.ts',
  // dbCollectionName: 'user-metadata',
  active: true,
  attributes: [
    { name: 'events', dataType: 'ModelEvent[]', default: '[]' },
  ]
}

export default baseModelMetadata
