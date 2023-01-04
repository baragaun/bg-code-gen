import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatMessageStatusInput: TypeGraphqlClass = {
  name: 'ChatMessageStatusInput',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/chats/types/classes/ChatMessageStatusInput.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'receivedAt', dataType: 'date' },
    { name: 'seenAt', dataType: 'date' },
  ]
}

export default chatMessageStatusInput
