import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const nonMemberInfoInput: TypeGraphqlClass = {
  name: 'NonMemberInfoInput',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/messaging/types/classes/NonMemberInfoInput.ts',
  active: true,
  attributes: [
    { name: 'firstName', dataType: 'string' },
    { name: 'lastName', dataType: 'string' },
    { name: 'email', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
  ]
}

export default nonMemberInfoInput
