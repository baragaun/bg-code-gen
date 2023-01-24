import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'User',
  graphqlType: GraphqlType.ObjectType,
  extends: 'SidUser',
  path: 'src/services/accounts/types/classes/User.ts',
  dbCollectionName: 'users',
  active: true,
  attributes: [
    { name: 'companyId', dataType: 'id' },
    { name: 'metadata', dataType: 'UserMetadata', optional: true },
  ]
}

export default user
