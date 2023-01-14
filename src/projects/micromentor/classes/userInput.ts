import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userInput: TypeGraphqlClass = {
  name: 'UserInput',
  graphqlType: GraphqlType.InputType,
  extends: 'SidUserInput',
  path: 'src/services/accounts/types/classes/UserInput.ts',
  active: true,
  attributes: [
    { name: 'addToGroupIds', dataType: 'string[]' },
    { name: 'removeFromGroupIds', dataType: 'string[]' },
    { name: 'companyId', dataType: 'id' },
    { name: 'groupIds', dataType: 'id[]', default: '[]' },
    { name: 'groupMembers', dataType: 'GroupMemberInput[]', default: '[]' },
    { name: 'preferredLanguage', dataType: 'string' },
    { name: 'spokenLanguages', dataType: 'string[]', default: '[]' },
    { name: 'seeksHelp', dataType: 'boolean', default: 'false' },
    { name: 'offersHelp', dataType: 'boolean', default: 'false' },
    { name: 'metadata', dataType: 'UserMetadataInput', optional: true },
  ]
}

export default userInput
