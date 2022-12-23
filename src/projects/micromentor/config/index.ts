import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../../types.js'
import { TaskType } from '../../../enums.js'
import appliedGroupRule from './appliedGroupRule.js'
import appliedGroupRuleInput from './graphql/appliedGroupRuleInput.js'
import baseModel from './baseModel.js'
import baseModelMetadata from './baseModelMetadata.js'
import baseModelMetadataInput from './graphql/baseModelMetadataInput.js'
import company from './company.js'
import companyInput from './graphql/companyInput.js'
import entrepreneursGroupMember from './entrepreneursGroupMember.js'
import expertise from './expertise.js'
import group from './group.js'
import groupInput from './graphql/groupInput.js'
import groupMember from './groupMember.js'
import groupMemberInput from './graphql/groupMemberInput.js'
import groupRule from './groupRule.js'
import groupRuleBaseConfig from './groupRuleBaseConfig.js'
import groupRuleBaseConfigInput from './graphql/groupRuleBaseConfigInput.js'
import groupRuleInput from './graphql/groupRuleInput.js'
import mentorsGroupMember from './mentorsGroupMember.js'
import modelEvent from './modelEvent.js'
import user from './user.js'
import userDevice from './userDevice.js'
import userDeviceInput from './graphql/userDeviceInput.js'
import userInput from './userInput.js'
import userListFilter from './userListFilter.js'
import userMetadata from './userMetadata.js'
import userMetadataInput from './graphql/userMetadataInput.js'
import userPreferences from './userPreferences.js'
import userPreferencesInput from './graphql/userPreferencesInput.js'
import userSignupInput from './userSignupInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  projectRoot: '../../micromentor/mm-backend-core',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    appliedGroupRule,
    appliedGroupRuleInput,
    baseModel,
    baseModelMetadata,
    baseModelMetadataInput,
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
    userListFilter,
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
