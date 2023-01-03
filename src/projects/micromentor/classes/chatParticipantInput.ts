import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatParticipantInput: TypeGraphqlClass = {
  name: 'ChatParticipantInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/chats/types/classes/ChatParticipantInput.ts',
  active: true,
  attributes: [
    { name: 'chatId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
  ]
}

export default chatParticipantInput
