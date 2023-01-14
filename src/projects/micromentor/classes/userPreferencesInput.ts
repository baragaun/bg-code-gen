import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userPreferencesInput: TypeGraphqlClass = {
  name: 'UserPreferencesInput',
  graphqlType: GraphqlType.InputType,
  extends: 'SidUserPreferencesInput',
  path: 'src/services/accounts/types/classes/UserPreferencesInput.ts',
  active: true,
  attributes: [
  ]
}

export default userPreferencesInput
