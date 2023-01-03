import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chat: TypeGraphqlClass = {
  name: 'Chat',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/chats/types/classes/Chat.ts',
  dbCollectionName: 'chats',
  active: true,
  attributes: [
    { name: 'chatType', dataType: 'ChatType', default: 'ChatType.NOT_SET' },
    { name: 'chatStatus', dataType: 'ChatStatus', default: 'ChatStatus.NOT_SET' },
    { name: 'createdByUserId', dataType: 'string' },
    { name: 'pausedAt', dataType: 'date', optional: true },
    { name: 'archivedAt', dataType: 'date', optional: true },
  ]
}

export default chat
