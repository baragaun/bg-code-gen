import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../types.js'
import { TaskType } from '../../enums.js'
import asyncTask from './classes/asyncTask.js'
import asyncTaskInput from './classes/asyncTaskInput.js'
import baseListFilter from './classes/baseListFilter.js'
import baseModel from './classes/baseModel.js'
import baseModelInput from './classes/baseModelInput.js'
import baseModelMetadata from './classes/baseModelMetadata.js'
import baseModelMetadataInput from './classes/baseModelMetadataInput.js'
import company from './classes/company.js'
import companyInput from './classes/companyInput.js'
import findObjectsOptions from './classes/findObjectsOptions.js'
import modelEvent from './classes/modelEvent.js'
import nonMemberInfo from './classes/nonMemberInfo.js'
import nonMemberInfoInput from './classes/nonMemberInfoInput.js'
import notification from './classes/notification.js'
import notificationInput from './classes/notificationInput.js'
import notificationTemplate from './classes/notificationTemplate.js'
import notificationTemplateInput from './classes/notificationTemplateInput.js'
import systemHealthReport from './classes/systemHealthReport.js'
import user from './classes/user.js'
import userDevice from './classes/userDevice.js'
import userDeviceInput from './classes/userDeviceInput.js'
import userDeviceListFilter from './classes/userDeviceListFilter.js'
import userInput from './classes/userInput.js'
import userListFilter from './classes/userListFilter.js'
import userMetadata from './classes/userMetadata.js'
import userMetadataInput from './classes/userMetadataInput.js'
import userPreferences from './classes/userPreferences.js'
import userPreferencesInput from './classes/userPreferencesInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  projectRoot: '../quark_server',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    asyncTask,
    asyncTaskInput,
    baseListFilter,
    baseModel,
    baseModelInput,
    baseModelMetadata,
    baseModelMetadataInput,
    company,
    companyInput,
    findObjectsOptions,
    modelEvent,
    nonMemberInfo,
    nonMemberInfoInput,
    notification,
    notificationInput,
    notificationTemplate,
    notificationTemplateInput,
    systemHealthReport,
    user,
    userDevice,
    userDeviceInput,
    userDeviceListFilter,
    userInput,
    userListFilter,
    userMetadata,
    userMetadataInput,
    userPreferences,
    userPreferencesInput,
  ],
}

const config: BgCodeGenProject = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
