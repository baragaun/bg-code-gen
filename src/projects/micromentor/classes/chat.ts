import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chat: TypeGraphqlClass = {
  name: 'Chat',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/chat/types/classes/Chat.ts',
  dbCollectionName: 'chats',
  active: true,
  attributes: [
    { name: 'ChatType', dataType: 'ChatType', default: 'ChatType.NOT_SET' },
    { name: 'ChatStatus', dataType: 'ChatStatus', default: 'ChatStatus.NOT_SET' },
    { name: 'createdByUserId', dataType: 'string' },
    { name: 'pausedAt', dataType: 'date', optional: true },
    { name: 'archivedAt', dataType: 'date', optional: true },
  ]
}

export default chat
