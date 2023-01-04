import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatMessageInput: TypeGraphqlClass = {
  name: 'ChatMessageInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/chats/types/classes/ChatMessageInput.ts',
  active: true,
  attributes: [
    { name: 'chatId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'replyToMessageId', dataType: 'id' },
    { name: 'chatMessageType', dataType: 'ChatMessageType' },
    { name: 'messageText', dataType: 'string' },
    { name: 'statuses', dataType: 'ChatMessageStatusInput[]' },
  ]
}

export default chatMessageInput
