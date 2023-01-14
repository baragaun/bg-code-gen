import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'User',
  graphqlType: GraphqlType.ObjectType,
  extends: 'SidUser',
  path: 'src/services/accounts/types/classes/User.ts',
  dbCollectionName: 'users',
  active: true,
  attributes: [
    { name: 'companyId', dataType: 'id' },
    { name: 'groupIds', dataType: 'id[]', default: '[]' },
    { name: 'groupMembers', dataType: 'GroupMember[]', default: '[]' },
    { name: 'preferredLanguage', dataType: 'string' },
    { name: 'spokenLanguages', dataType: 'string[]', default: '[]' },
    { name: 'seeksHelp', dataType: 'boolean', default: 'false' },
    { name: 'offersHelp', dataType: 'boolean', default: 'false' },
    { name: 'metadata', dataType: 'UserMetadata', optional: true },
  ]
}

export default user
