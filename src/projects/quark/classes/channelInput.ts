import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelInput: TypeGraphqlClass = {
  name: 'ChannelInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/channels/types/classes/ChannelInput.ts',
  active: true,
  attributes: [
    { name: 'channelType', dataType: 'ChannelType' },
    { name: 'channelStatus', dataType: 'ChannelStatus' },
    { name: 'participantIds', dataType: 'string[]' },
    { name: 'pausedAt', dataType: 'date' },
    { name: 'archivedAt', dataType: 'date' },
  ]
}

export default channelInput
