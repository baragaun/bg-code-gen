import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'UserDeviceInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/accounts/types/classes/UserDeviceInput.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'deviceType', dataType: 'string' },
    { name: 'trusted', dataType: 'boolean' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'phoneNumberUpdatedAt', dataType: 'date' },
    { name: 'isPhoneNumberVerified', dataType: 'boolean' },
    { name: 'brand', dataType: 'string' },
    { name: 'model', dataType: 'string' },
    { name: 'isTablet', dataType: 'boolean' },
    { name: 'screenWidth', dataType: 'integer' },
    { name: 'screenHeight', dataType: 'integer' },
    { name: 'os', dataType: 'string' },
    { name: 'osVersion', dataType: 'string' },
    { name: 'timezone', dataType: 'string' },
    { name: 'ipAddress', dataType: 'string' },
    { name: 'locale', dataType: 'string' },
    { name: 'countryCode', dataType: 'string' },
    { name: 'appVersion', dataType: 'string' },
    { name: 'signedInAt', dataType: 'date' },
    { name: 'signedOutAt', dataType: 'date' },
    { name: 'sessionStartedAt', dataType: 'date' },
    { name: 'sessionEndedAt', dataType: 'date' },
    { name: 'authToken', dataType: 'string' },
    { name: 'authTokenCreatedAt', dataType: 'date' },
    { name: 'authTokenExperiesAt', dataType: 'date' },
    { name: 'oAuthToken', dataType: 'string' },
    { name: 'oAuthTokenExpiresAt', dataType: 'date' },
    { name: 'oAuthProvider', dataType: 'string' },
    { name: 'oAuthRefreshToken', dataType: 'string' },
    { name: 'pushNotificationToken', dataType: 'string' },
    { name: 'trustedAt', dataType: 'date' },
    { name: 'uiLanguage', dataType: 'string' },
  ]
}

export default user
