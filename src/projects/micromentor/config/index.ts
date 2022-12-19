import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../../types.js'
import { TaskType } from '../../../enums.js'
import appliedGroupRule from './appliedGroupRule.js'
import appliedGroupRuleInput from './appliedGroupRuleInput.js'
import baseModel from './baseModel.js'
import baseModelMetadata from './baseModelMetadata.js'
import company from './company.js'
import companyInput from './companyInput.js'
import entrepreneursGroupMember from './entrepreneursGroupMember.js'
import expertise from './expertise.js'
import group from './group.js'
import groupInput from './groupInput.js'
import groupMember from './groupMember.js'
import groupMemberInput from './groupMemberInput.js'
import groupRule from './groupRule.js'
import groupRuleBaseConfig from './groupRuleBaseConfig.js'
import groupRuleBaseConfigInput from './groupRuleBaseConfigInput.js'
import groupRuleInput from './groupRuleInput.js'
import mentorsGroupMember from './mentorsGroupMember.js'
import modelEvent from './modelEvent.js'
import user from './user.js'
import userDevice from './userDevice.js'
import userDeviceInput from './userDeviceInput.js'
import userInput from './userInput.js'
import userMetadata from './userMetadata.js'
import userMetadataInput from './userMetadataInput.js'
import userPreferences from './userPreferences.js'
import userPreferencesInput from './userPreferencesInput.js'
import userSignupInput from './userSignupInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  mongoDbCollectionsPath: '../mm-backend-core/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    appliedGroupRule,
    appliedGroupRuleInput,
    baseModel,
    baseModelMetadata,
    company,
    companyInput,
    expertise,
    entrepreneursGroupMember,
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
    user,
    userDevice,
    userDeviceInput,
    userInput,
    userMetadata,
    userMetadataInput,
    userPreferences,
    userPreferencesInput,
    userSignupInput,
  ],
}

const config: BgCodeGenProject = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
