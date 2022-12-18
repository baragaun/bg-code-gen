import {
  BgCodeGenConfig,
  SyncTypeGraphqlClassesTask,
} from '../../../types.js'
import { TaskType } from '../../../enums.js'
import baseModel from './baseModel.js'
import user from './user.js'
import userMetadata from './userMetadata.js'
import userMetadataInput from './userMetadataInput.js'
import userPreferences from './userPreferences.js'
import userInput from './userInput.js'
import addUserInput from './addUserInput.js'
import userPreferencesInput from './userPreferencesInput.js'
import group from './group.js'
import groupInput from './groupInput.js'
import company from './company.js'
import companyInput from './companyInput.js'
import groupMember from './groupMember.js'
import groupMemberInput from './groupMemberInput.js'

const syncTypeGraphqlClassesTask: SyncTypeGraphqlClassesTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  active: true,
  mongoDbCollectionsPath: '../mm-backend-core/src/services/db/mongoDb/helpers/collections.ts',
  classes: [
    addUserInput,
    baseModel,
    company,
    companyInput,
    group,
    groupInput,
    groupMember,
    groupMemberInput,
    user,
    userInput,
    userMetadata,
    userMetadataInput,
    userPreferences,
    userPreferencesInput,
  ],
}

const config: BgCodeGenConfig = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
