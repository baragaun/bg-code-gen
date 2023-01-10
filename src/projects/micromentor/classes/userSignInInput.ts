import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userSignInInput: TypeGraphqlClass = {
  name: 'UserSignUpInput',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/secureId/types/classes/UserSignInInput.ts',
  active: true,
  attributes: [
    { name: 'ident', dataType: 'string' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'password', dataType: 'string' },
  ]
}

export default userSignInInput
