import {
  BgCodeGenConfig,
  BgCodeGenClassConfig,
  SyncTypeGraphqlClassesTask,
} from '../types.js'

const classes: BgCodeGenClassConfig[] = [
  {
    name: 'User',
    // tags: [
    //   '@ObjectType({ implements: BaseModel })',
    // ],
    // extends: 'BaseModel',
    objectPath: '../mm-backend-core/src/services/accounts/types/classes/User.ts',
    inputPath: '../mm-backend-core/src/services/accounts/types/classes/UserInput.ts',
    dbCollectionName: 'users',
    attributes: [
      { name: 'appFeatures', dataType: 'AppFeature[]', default: '[]' },
      { name: 'authType', dataType: 'AuthType', optional: true },
      { name: 'authToken', dataType: 'string' },
      { name: 'authTokenCreatedAt', dataType: 'date', optional: true },
      { name: 'oAuthTokenExpiresAt', dataType: 'date', optional: true },
      { name: 'avatarUrl', dataType: 'string' },
      { name: 'email', dataType: 'string' },
      { name: 'emailUpdatedAt', dataType: 'date', optional: true },
      { name: 'isEmailVerified', dataType: 'boolean', default: 'false' },
      { name: 'firstName', dataType: 'string' },
      { name: 'companyId', dataType: 'string' },
      { name: 'groupIds', dataType: 'string[]', default: '[]' },
      { name: 'lastName', dataType: 'string' },
      { name: 'oAuthProvider', dataType: 'string' },
      { name: 'oAuthRefreshToken', dataType: 'string' },
      { name: 'oAuthToken', dataType: 'string' },
      { name: 'password', dataType: 'string' },
      { name: 'passwordHash', dataType: 'string' },
      { name: 'passwordUpdatedAt', dataType: 'date', optional: true },
      { name: 'phoneNumber', dataType: 'string' },
      { name: 'phoneNumberUpdatedAt', dataType: 'date', optional: true },
      { name: 'isPhoneNumberVerified', dataType: 'boolean', default: 'false' },
      { name: 'preferredLanguage', dataType: 'string' },
      { name: 'tfaBackupCodes', dataType: 'string' },
      { name: 'roles', dataType: 'UserRole[]', default: '[]' },
      { name: 'gender', dataType: 'string' },
      { name: 'source', dataType: 'string' },
      { name: 'spokenLanguages', dataType: 'string[]', default: '[]' },
      { name: 'timezone', dataType: 'string' },
      { name: 'trustLevel', dataType: 'integer', default: '1' },
      { name: 'preferences', dataType: 'UserPreferences', default: '{}' },
      { name: 'metadata', dataType: 'UserMetadata', default: '{}' },
      { name: 'username', dataType: 'string' },
      { name: 'signedInAt', dataType: 'date', optional: true },
      { name: 'signedOutAt', dataType: 'date', optional: true },
      { name: 'countryOfResidence', dataType: 'string' },
      { name: 'regionOfResidence', dataType: 'string' },
      { name: 'cityOfResidence', dataType: 'string' },
      { name: 'isEntrepreneur', dataType: 'boolean', default: 'false' },
      { name: 'isMentor', dataType: 'boolean', default: 'false' },
      { name: 'groups', dataType: 'GroupMember[]', default: '[]' },
    ]
  },
]

const task: SyncTypeGraphqlClassesTask = {
  name: 'sync-type-graphql-class',
  mongoDbCollectionsPath: '../mm-backend-core/src/services/db/mongoDb/helpers/collections.ts',
  classes,
}

const config: BgCodeGenConfig = {
  tasks: [task]
}

export default config
