import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userAuthResponse: TypeGraphqlClass = {
  name: 'UserAuthResponse',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/secureId/types/classes/UserAuthResponse.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'string' },
    { name: 'deviceId', dataType: 'string' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'authToken', dataType: 'string' },
    { name: 'authTokenExpiresAt', dataType: 'date', optional: true },
  ]
}

export default userAuthResponse
