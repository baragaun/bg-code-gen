import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userInput: TypeGraphqlClass = {
  name: 'UserInput',
  graphqlType: GraphqlType.InputType,
  extends: 'SecureIdUserInput',
  path: 'src/services/accounts/types/classes/UserInput.ts',
  active: true,
  attributes: [
    { name: 'addToGroupIds', dataType: 'string[]' },
    { name: 'removeFromGroupIds', dataType: 'string[]' },
    { name: 'companyId', dataType: 'id' },
    { name: 'groupIds', dataType: 'id[]', default: '[]' },
    { name: 'groups', dataType: 'GroupMemberInput[]', default: '[]' },
    { name: 'preferredLanguage', dataType: 'string' },
    { name: 'spokenLanguages', dataType: 'string[]', default: '[]' },
    { name: 'isEntrepreneur', dataType: 'boolean', default: 'false' },
    { name: 'isMentor', dataType: 'boolean', default: 'false' },
    { name: 'metadata', dataType: 'UserMetadataInput', optional: true },
  ]
}

export default userInput
