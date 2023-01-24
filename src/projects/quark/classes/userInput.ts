import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userInput: TypeGraphqlClass = {
  name: 'UserInput',
  graphqlType: GraphqlType.InputType,
  extends: 'SidUserInput',
  path: 'src/services/accounts/types/classes/UserInput.ts',
  active: true,
  attributes: [
    { name: 'companyId', dataType: 'id' },
    { name: 'metadata', dataType: 'UserMetadataInput', optional: true },
  ]
}

export default userInput
