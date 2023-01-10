import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelMessageStatus: TypeGraphqlClass = {
  name: 'ChannelMessageStatus',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/channels/types/classes/ChannelMessageStatus.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'receivedAt', dataType: 'date', optional: true },
    { name: 'seenAt', dataType: 'date', optional: true },
  ]
}

export default channelMessageStatus
