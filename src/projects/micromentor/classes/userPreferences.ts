import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userPreferences: TypeGraphqlClass = {
  name: 'UserPreferences',
  graphqlType: GraphqlType.ObjectType,
  extends: 'SidUserPreferences',
  path: 'src/services/accounts/types/classes/UserPreferences.ts',
  dbCollectionName: 'user-preferences',
  active: true,
  attributes: [
  ]
}

export default userPreferences
