import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelMessage: TypeGraphqlClass = {
  name: 'ChannelMessage',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/channels/types/classes/ChannelMessage.ts',
  dbCollectionName: 'channelMessages',
  active: true,
  attributes: [
    { name: 'channelId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'replyToMessageId', dataType: 'id' },
    { name: 'channelMessageType', dataType: 'ChannelMessageType', default: 'ChannelMessageType.unset' },
    { name: 'messageText', dataType: 'string' },
    { name: 'statuses', dataType: 'ChannelMessageStatus[]', default: '[]' },
  ]
}

export default channelMessage
