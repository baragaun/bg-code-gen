import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userPreferencesInput: TypeGraphqlClass = {
  name: 'UserPreferencesInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/UserPreferencesInput.ts',
  active: true,
  attributes: [
    { name: 'shareEmail', dataType: 'boolean', optional: true },
    { name: 'sharePhoneNumber', dataType: 'boolean', optional: true },
    { name: 'showWelcomeMessage', dataType: 'boolean', optional: true },
  ]
}

export default userPreferencesInput
