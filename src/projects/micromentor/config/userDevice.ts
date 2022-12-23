import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'UserDevice',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: '/src/services/accounts/types/classes/UserDevice.ts',
  dbCollectionName: 'user-devices',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id', optional: false },
    { name: 'deviceUuid', dataType: 'string', default: '\'\'' },
    { name: 'deviceType', dataType: 'string', default: '\'\'' },
    { name: 'authToken', dataType: 'string', default: '\'\'' },
    { name: 'trusted', dataType: 'boolean', default: 'false' },
    { name: 'phoneNumber', dataType: 'string', default: '\'\'' },
    { name: 'phoneNumberUpdatedAt', dataType: 'date', optional: true },
    { name: 'isPhoneNumberVerified', dataType: 'boolean', default: 'false' },
    { name: 'brand', dataType: 'string', default: '\'\'' },
    { name: 'model', dataType: 'string', default: '\'\'' },
    { name: 'isTablet', dataType: 'boolean', default: 'false' },
    { name: 'screenWidth', dataType: 'integer', default: '0' },
    { name: 'screenHeight', dataType: 'integer', default: '0' },
    { name: 'os', dataType: 'string', default: '\'\'' },
    { name: 'osVersion', dataType: 'string', default: '\'\'' },
    { name: 'timezone', dataType: 'string', default: '\'\'' },
    { name: 'ipAddress', dataType: 'string', default: '\'\'' },
    { name: 'locale', dataType: 'string', default: '\'\'' },
    { name: 'countryCode', dataType: 'string', default: '\'\'' },
    { name: 'appVersion', dataType: 'string', default: '\'\'' },
    { name: 'signedInAt', dataType: 'date', optional: true },
    { name: 'signedOutAt', dataType: 'date', optional: true },
    { name: 'sessionStartedAt', dataType: 'date', optional: true },
    { name: 'sessionEndedAt', dataType: 'date', optional: true },
    { name: 'authTokenCreatedAt', dataType: 'date', optional: true },
    { name: 'pushNotificationToken', dataType: 'string', default: '\'\'' },
    { name: 'trustedAt', dataType: 'date', optional: true },
    { name: 'uiLanguage', dataType: 'string', default: '\'\'' },
  ]
}

export default user
