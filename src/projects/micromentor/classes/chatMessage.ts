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
    { name: 'chatId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'replyToMessageId', dataType: 'id' },
    { name: 'chatMessageType', dataType: 'ChatMessageType', default: 'ChatMessageType.NOT_SET' },
    { name: 'messageText', dataType: 'string' },
    { name: 'statuses', dataType: 'ChatMessageStatus[]', default: '[]' },
  ]
}

export default chatMessage
