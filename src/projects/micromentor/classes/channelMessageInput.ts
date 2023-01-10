import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelMessageInput: TypeGraphqlClass = {
  name: 'ChannelMessageInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/channels/types/classes/ChannelMessageInput.ts',
  active: true,
  attributes: [
    { name: 'channelId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'replyToMessageId', dataType: 'id' },
    { name: 'channelMessageType', dataType: 'ChannelMessageType' },
    { name: 'messageText', dataType: 'string' },
    { name: 'statuses', dataType: 'ChannelMessageStatusInput[]' },
  ]
}

export default channelMessageInput
