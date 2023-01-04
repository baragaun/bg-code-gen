import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatMessageStatus: TypeGraphqlClass = {
  name: 'ChatMessageStatus',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/chats/types/classes/ChatMessageStatus.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'receivedAt', dataType: 'date', optional: true },
    { name: 'seenAt', dataType: 'date', optional: true },
  ]
}

export default chatMessageStatus
