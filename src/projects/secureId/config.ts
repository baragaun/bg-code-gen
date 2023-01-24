import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../../types.js'
import { TaskType } from '../../enums.js'
import sidUser from './classes/sidUser.js'
import sidUserDevice from './classes/sidUserDevice.js'
import sidUserDeviceInput from './classes/sidUserDeviceInput.js'
import sidUserDeviceListFilter from './classes/sidUserDeviceListFilter.js'
import sidUserInput from './classes/sidUserInput.js'
import sidUserListFilter from './classes/sidUserListFilter.js'
import sidUserPreferences from './classes/sidUserPreferences.js'
import sidUserPreferencesInput from './classes/sidUserPreferencesInput.js'
import userAuthResponse from './classes/userAuthResponse.js'
import userSignInInput from './classes/userSignInInput.js'
import userSignUpInput from './classes/userSignUpInput.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.SYNC_TYPE_GRAPHQL_CLASS,
  projectRoot: '../quark_server',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    sidUser,
    sidUserDevice,
    sidUserDeviceInput,
    sidUserDeviceListFilter,
    sidUserInput,
    sidUserListFilter,
    sidUserPreferences,
    sidUserPreferencesInput,
    userAuthResponse,
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
