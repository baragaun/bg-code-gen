import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userDeviceInput: TypeGraphqlClass = {
  name: 'UserDeviceInput',
  graphqlType: GraphqlType.InputType,
  extends: 'SidUserDeviceInput',
  path: 'src/services/accounts/types/classes/UserDeviceInput.ts',
  active: true,
  attributes: [
  ]
}

export default userDeviceInput
