import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const sidUserPreferences: TypeGraphqlClass = {
  name: 'SidUserPreferences',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/secureId/types/classes/SidUserPreferences.ts',
  active: true,
  attributes: [
    { name: 'shareEmail', dataType: 'boolean', optional: true },
    { name: 'sharePhoneNumber', dataType: 'boolean', optional: true },
    { name: 'showWelcomeMessage', dataType: 'boolean', optional: true },
  ]
}

export default sidUserPreferences
