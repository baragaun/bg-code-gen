import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../types.js'
import { TaskType } from '../../enums.js'
import appliedGroupRule from './config/classes/appliedGroupRule.js'
import appliedGroupRuleInput from './config/classes/appliedGroupRuleInput.js'
import baseModel from './config/classes/baseModel.js'
import baseModelMetadata from './config/classes/baseModelMetadata.js'
import baseModelMetadataInput from './config/classes/baseModelMetadataInput.js'
import company from './config/classes/company.js'
import companyInput from './config/classes/companyInput.js'
import entrepreneursGroupMember from './config/classes/entrepreneursGroupMember.js'
import expertise from './config/classes/expertise.js'
import group from './config/classes/group.js'
import groupInput from './config/classes/groupInput.js'
import groupMember from './config/classes/groupMember.js'
import groupMemberInput from './config/classes/groupMemberInput.js'
import groupRule from './config/classes/groupRule.js'
import groupRuleBaseConfig from './config/classes/groupRuleBaseConfig.js'
import groupRuleBaseConfigInput from './config/classes/groupRuleBaseConfigInput.js'
import groupRuleInput from './config/classes/groupRuleInput.js'
import mentorsGroupMember from './config/classes/mentorsGroupMember.js'
import modelEvent from './config/classes/modelEvent.js'
import user from './config/classes/user.js'
import userDevice from './config/classes/userDevice.js'
import userDeviceInput from './config/classes/userDeviceInput.js'
import userInput from './config/classes/userInput.js'
import userListFilter from './config/classes/userListFilter.js'
import userMetadata from './config/classes/userMetadata.js'
import userMetadataInput from './config/classes/userMetadataInput.js'
import userPreferences from './config/classes/userPreferences.js'
import userPreferencesInput from './config/classes/userPreferencesInput.js'
import userSignupInput from './config/classes/userSignupInput.js'

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
