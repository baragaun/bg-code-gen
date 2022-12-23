import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const chatParticipant: TypeGraphqlClass = {
  name: 'ChatParticipant',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: '/src/services/chat/types/classes/ChatParticipant.ts',
  dbCollectionName: 'chatParticipants',
  active: true,
  attributes: [
    { name: 'chatId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
  ]
}

export default chatParticipant
