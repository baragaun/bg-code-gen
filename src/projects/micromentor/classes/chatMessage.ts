import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatMessage: TypeGraphqlClass = {
  name: 'ChatMessage',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/chats/types/classes/ChatMessage.ts',
  dbCollectionName: 'chatMessages',
  active: true,
  attributes: [
    { name: 'chatMessageType', dataType: 'ChatMessageType', default: 'ChatMessageType.NOT_SET' },
    { name: 'status', dataType: 'ChatMessageStatus', default: 'ChatMessageStatus.NOT_SET' },
    { name: 'createdByUserId', dataType: 'id' },
    { name: 'messageText', dataType: 'string' },
    { name: 'seenAt', dataType: 'date', optional: true },
  ]
}

export default chatMessage
