import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../types.js'
import { TaskType } from '../../enums.js'
import channel from './classes/channel.js'
import channelInput from './classes/channelInput.js'
import channelMessage from './classes/channelMessage.js'
import channelMessageInput from './classes/channelMessageInput.js'
import channelMessageStatus from './classes/channelMessageStatus.js'
import channelMessageStatusInput from './classes/channelMessageStatusInput.js'
import channelParticipant from './classes/channelParticipant.js'
import channelParticipantInput from './classes/channelParticipantInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  projectRoot: '../channels-service',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    channel,
    channelInput,
    channelMessage,
    channelMessageInput,
    channelMessageStatus,
    channelMessageStatusInput,
    channelParticipant,
    channelParticipantInput,
  ],
}

const config: BgCodeGenProject = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
