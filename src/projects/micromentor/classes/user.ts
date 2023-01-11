import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'User',
  graphqlType: GraphqlType.ObjectType,
  extends: 'SecureIdUser',
  path: 'src/services/accounts/types/classes/User.ts',
  dbCollectionName: 'users',
  active: true,
  attributes: [
    { name: 'companyId', dataType: 'id' },
    { name: 'groupIds', dataType: 'id[]', default: '[]' },
    { name: 'groups', dataType: 'GroupMember[]', default: '[]' },
    { name: 'preferredLanguage', dataType: 'string' },
    { name: 'spokenLanguages', dataType: 'string[]', default: '[]' },
    { name: 'isEntrepreneur', dataType: 'boolean', default: 'false' },
    { name: 'isMentor', dataType: 'boolean', default: 'false' },
    { name: 'metadata', dataType: 'UserMetadata', optional: true },
  ]
}

export default user
