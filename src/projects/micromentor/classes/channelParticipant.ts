import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelParticipant: TypeGraphqlClass = {
  name: 'ChannelParticipant',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/channels/types/classes/ChannelParticipant.ts',
  dbCollectionName: 'channelParticipants',
  active: true,
  attributes: [
    { name: 'channelId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
  ]
}

export default channelParticipant
