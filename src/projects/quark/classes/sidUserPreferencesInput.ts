import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const sidUserPreferencesInput: TypeGraphqlClass = {
  name: 'SidUserPreferencesInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/secureId/types/classes/SidUserPreferencesInput.ts',
  active: true,
  attributes: [
    { name: 'shareEmail', dataType: 'boolean', optional: true },
    { name: 'sharePhoneNumber', dataType: 'boolean', optional: true },
    { name: 'showWelcomeMessage', dataType: 'boolean', optional: true },
  ]
}

export default sidUserPreferencesInput
