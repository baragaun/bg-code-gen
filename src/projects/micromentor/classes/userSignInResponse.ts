import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userSignInResponse: TypeGraphqlClass = {
  name: 'UserSignInResponse',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/accounts/types/classes/UserSignInResponse.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'string' },
    { name: 'authToken', dataType: 'string' },
  ]
}

export default userSignInResponse
