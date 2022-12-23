import { TypeGraphqlClass } from '../../../../types.js'
import { GraphqlType } from '../../../../enums.js'

const userMetadata: TypeGraphqlClass = {
  name: 'UserMetadata',
  graphqlType: GraphqlType.ObjectType,
  path: '/src/services/accounts/types/classes/UserMetadata.ts',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default userMetadata
