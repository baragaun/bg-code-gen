import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupMember: BgCodeGenClassConfig = {
  name: 'GroupMember',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: '../mm-backend-core/src/services/accounts/types/classes/GroupMember.ts',
  dbCollectionName: 'group-members',
  active: true,
  attributes: [
    { name: 'groupId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'roles', dataType: 'GroupMemberRole[]', default: '[]', optional: false },
  ]
}

export default groupMember
