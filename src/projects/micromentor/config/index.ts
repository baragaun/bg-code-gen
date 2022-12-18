import {
  BgCodeGenConfig,
  SyncTypeGraphqlClassesTask,
} from '../../../types.js'
import { TaskType } from '../../../enums.js'
import baseModel from './baseModel.js'
import company from './company.js'
import companyInput from './companyInput.js'
import group from './group.js'
import groupInput from './groupInput.js'
import groupMember from './groupMember.js'
import groupMemberInput from './groupMemberInput.js'
import user from './user.js'
import userInput from './userInput.js'
import userMetadata from './userMetadata.js'
import userMetadataInput from './userMetadataInput.js'
import userPreferences from './userPreferences.js'
import userPreferencesInput from './userPreferencesInput.js'
import userSignupInput from './userSignupInput.js'
import modelEvent from './modelEvent.js'
import baseModelMetadata from './baseModelMetadata.js'

const syncTypeGraphqlClassesTask: SyncTypeGraphqlClassesTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  active: true,
  mongoDbCollectionsPath: '../mm-backend-core/src/services/db/mongoDb/helpers/collections.ts',
  classes: [
    baseModel,
    baseModelMetadata,
    company,
    companyInput,
    group,
    groupInput,
    groupMember,
    groupMemberInput,
    modelEvent,
    user,
    userInput,
    userMetadata,
    userMetadataInput,
    userPreferences,
    userPreferencesInput,
    userSignupInput,
  ],
}

const config: BgCodeGenConfig = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
