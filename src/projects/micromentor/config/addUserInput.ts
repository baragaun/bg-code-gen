import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const addUserInput: BgCodeGenClassConfig = {
  name: 'AddUserInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/AddUserInput.ts',
  active: true,
  attributes: [
    { name: 'firstName', dataType: 'string' },
    { name: 'lastName', dataType: 'string' },
    { name: 'username', dataType: 'string' },
    { name: 'email', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'password', dataType: 'string' },
    { name: 'source', dataType: 'string' },
    { name: 'timezone', dataType: 'string' },
    { name: 'pushNotificationToken', dataType: 'string' },
  ]
}

export default addUserInput
