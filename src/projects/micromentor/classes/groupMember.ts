import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupMember: TypeGraphqlClass = {
  name: 'GroupMember',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/accounts/types/classes/GroupMember.ts',
  dbCollectionName: 'group-members',
  active: true,
  attributes: [
    { name: 'groupId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'roles', dataType: 'GroupMemberRole[]', default: '[]', optional: false },
  ]
}

export default groupMember
