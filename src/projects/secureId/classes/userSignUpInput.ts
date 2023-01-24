import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const UserSignUpInput: TypeGraphqlClass = {
  name: 'UserSignUpInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/secureId/types/classes/UserSignUpInput.ts',
  active: true,
  attributes: [
    { name: 'firstName', dataType: 'string' },
    { name: 'lastName', dataType: 'string' },
    { name: 'fullName', dataType: 'string' },
    { name: 'userHandle', dataType: 'string' },
    { name: 'email', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'password', dataType: 'string' },
    { name: 'source', dataType: 'string' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'timezone', dataType: 'string' },
    { name: 'pushNotificationToken', dataType: 'string' },
    { name: 'checkAvailable', dataType: 'boolean', default: 'true' },
  ]
}

export default UserSignUpInput
