import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const channelParticipantInput: TypeGraphqlClass = {
  name: 'ChannelParticipantInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/channels/types/classes/ChannelParticipantInput.ts',
  active: true,
  attributes: [
    { name: 'channelId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
  ]
}

export default channelParticipantInput
