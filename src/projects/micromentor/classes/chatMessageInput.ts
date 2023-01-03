import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatMessageInput: TypeGraphqlClass = {
  name: 'ChatMessageInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/chats/types/classes/ChatMessageInput.ts',
  active: true,
  attributes: [
    { name: 'chatMessageType', dataType: 'ChatMessageType' },
    { name: 'status', dataType: 'ChatMessageStatus' },
    { name: 'createdByUserId', dataType: 'id' },
    { name: 'messageText', dataType: 'string' },
    { name: 'seenAt', dataType: 'date' },
  ]
}

export default chatMessageInput
