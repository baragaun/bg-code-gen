import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelMessageStatusInput: TypeGraphqlClass = {
  name: 'ChannelMessageStatusInput',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/channels/types/classes/ChannelMessageStatusInput.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'receivedAt', dataType: 'date' },
    { name: 'seenAt', dataType: 'date' },
  ]
}

export default channelMessageStatusInput
