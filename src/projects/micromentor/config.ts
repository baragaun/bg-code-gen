import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../types.js'
import { TaskType } from '../../enums.js'
import appliedGroupRule from './classes/appliedGroupRule.js'
import appliedGroupRuleInput from './classes/appliedGroupRuleInput.js'
import baseListFilter from './classes/baseListFilter.js'
import baseModel from './classes/baseModel.js'
import baseModelInput from './classes/baseModelInput.js'
import baseModelMetadata from './classes/baseModelMetadata.js'
import baseModelMetadataInput from './classes/baseModelMetadataInput.js'
import channel from './classes/channel.js'
import channelInput from './classes/channelInput.js'
import channelMessage from './classes/channelMessage.js'
import channelMessageStatus from './classes/channelMessageStatus.js'
import channelMessageStatusInput from './classes/channelMessageStatusInput.js'
import channelMessageInput from './classes/channelMessageInput.js'
import channelParticipant from './classes/channelParticipant.js'
import channelParticipantInput from './classes/channelParticipantInput.js'
import company from './classes/company.js'
import companyInput from './classes/companyInput.js'
import entrepreneursGroupMember from './classes/entrepreneursGroupMember.js'
import expertise from './classes/expertise.js'
import findObjectsOptions from './classes/findObjectsOptions.js'
import group from './classes/group.js'
import groupInput from './classes/groupInput.js'
import groupMember from './classes/groupMember.js'
import groupMemberInput from './classes/groupMemberInput.js'
import groupRule from './classes/groupRule.js'
import groupRuleBaseConfig from './classes/groupRuleBaseConfig.js'
import groupRuleBaseConfigInput from './classes/groupRuleBaseConfigInput.js'
import groupRuleInput from './classes/groupRuleInput.js'
import mentorsGroupMember from './classes/mentorsGroupMember.js'
import modelEvent from './classes/modelEvent.js'
import nonMemberInfo from './classes/nonMemberInfo.js'
import nonMemberInfoInput from './classes/nonMemberInfoInput.js'
import notification from './classes/notification.js'
import notificationInput from './classes/notificationInput.js'
import notificationTemplate from './classes/notificationTemplate.js'
import notificationTemplateInput from './classes/notificationTemplateInput.js'
import user from './classes/user.js'
import userDevice from './classes/userDevice.js'
import userDeviceInput from './classes/userDeviceInput.js'
import userInput from './classes/userInput.js'
import userListFilter from './classes/userListFilter.js'
import userMetadata from './classes/userMetadata.js'
import userMetadataInput from './classes/userMetadataInput.js'
import userPreferences from './classes/userPreferences.js'
import userPreferencesInput from './classes/userPreferencesInput.js'
import userSignInInput from './classes/userSignInInput.js'
import userSignUpInput from './classes/userSignUpInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  // projectRoot: '../../micromentor/mm-backend-core',
  projectRoot: '../mm-backend-core',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    appliedGroupRule,
    appliedGroupRuleInput,
    baseListFilter,
    baseModel,
    baseModelInput,
    baseModelMetadata,
    baseModelMetadataInput,
    channel,
    channelInput,
    channelMessage,
    channelMessageInput,
    channelMessageStatus,
    channelMessageStatusInput,
    channelParticipant,
    channelParticipantInput,
    company,
    companyInput,
    entrepreneursGroupMember,
    expertise,
    findObjectsOptions,
    group,
    groupInput,
    groupMember,
    groupMemberInput,
    groupRule,
    groupRuleBaseConfig,
    groupRuleBaseConfigInput,
    groupRuleInput,
    mentorsGroupMember,
    modelEvent,
    nonMemberInfo,
    nonMemberInfoInput,
    notification,
    notificationInput,
    notificationTemplate,
    notificationTemplateInput,
    user,
    userDevice,
    userDeviceInput,
    userInput,
    userListFilter,
    userMetadata,
    userMetadataInput,
    userPreferences,
    userPreferencesInput,
    userSignInInput,
    userSignUpInput,
  ],
}

const config: BgCodeGenProject = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
