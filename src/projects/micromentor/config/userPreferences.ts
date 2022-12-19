import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userPreferences: TypeGraphqlClass = {
  name: 'UserPreferences',
  graphqlType: GraphqlType.ObjectType,
  path: '../mm-backend-core/src/services/accounts/types/classes/UserPreferences.ts',
  dbCollectionName: 'user-preferences',
  active: true,
  attributes: [
    { name: 'shareEmail', dataType: 'boolean', optional: true },
    { name: 'sharePhoneNumber', dataType: 'boolean', optional: true },
    { name: 'showWelcomeMessage', dataType: 'boolean', optional: true },
  ]
}

export default userPreferences
