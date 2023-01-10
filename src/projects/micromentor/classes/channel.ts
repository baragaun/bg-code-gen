import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channel: TypeGraphqlClass = {
  name: 'Channel',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/channels/types/classes/Channel.ts',
  dbCollectionName: 'channels',
  active: true,
  attributes: [
    { name: 'channelType', dataType: 'ChannelType', default: 'ChannelType.NOT_SET' },
    { name: 'channelStatus', dataType: 'ChannelStatus', default: 'ChannelStatus.NOT_SET' },
    { name: 'pausedAt', dataType: 'date', optional: true },
    { name: 'archivedAt', dataType: 'date', optional: true },
  ]
}

export default channel
