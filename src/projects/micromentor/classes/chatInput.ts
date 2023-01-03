import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatInput: TypeGraphqlClass = {
  name: 'ChatInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/chats/types/classes/ChatInput.ts',
  active: true,
  attributes: [
    { name: 'chatType', dataType: 'ChatType' },
    { name: 'chatStatus', dataType: 'ChatStatus' },
    { name: 'participantIds', dataType: 'string[]' },
    { name: 'createdByUserId', dataType: 'string' },
    { name: 'pausedAt', dataType: 'date' },
    { name: 'archivedAt', dataType: 'date' },
  ]
}

export default chatInput
