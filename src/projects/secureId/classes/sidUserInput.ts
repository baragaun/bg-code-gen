import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const sidUserInput: TypeGraphqlClass = {
  name: 'SidUserInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/secureId/types/classes/SidUserInput.ts',
  active: true,
  attributes: [
    { name: 'firstName', dataType: 'string' },
    { name: 'lastName', dataType: 'string' },
    { name: 'fullName', dataType: 'string' },
    { name: 'userHandle', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'phoneNumberUpdatedAt', dataType: 'date', optional: true },
    { name: 'isPhoneNumberVerified', dataType: 'boolean', default: 'false' },
    { name: 'email', dataType: 'string' },
    { name: 'emailUpdatedAt', dataType: 'date', optional: true },
    { name: 'isEmailVerified', dataType: 'boolean', default: 'false' },
    { name: 'gender', dataType: 'string' },
    { name: 'countryOfResidence', dataType: 'string' },
    { name: 'regionOfResidence', dataType: 'string' },
    { name: 'cityOfResidence', dataType: 'string' },
    { name: 'avatarUrl', dataType: 'string' },
    { name: 'authType', dataType: 'AuthType', optional: true },
    { name: 'currentPassword', dataType: 'string' },
    { name: 'newPassword', dataType: 'string' },
    { name: 'passwordHash', dataType: 'string' },
    { name: 'tfaBackupCodes', dataType: 'string' },
    { name: 'passwordUpdatedAt', dataType: 'date', optional: true },
    { name: 'roles', dataType: 'UserRole[]', default: '[]' },
    { name: 'appFeatures', dataType: 'AppFeature[]', optional: true },
    { name: 'source', dataType: 'string' },
    { name: 'timezone', dataType: 'string' },
    { name: 'preferences', dataType: 'UserPreferencesInput', optional: true },
    { name: 'trustLevel', dataType: 'integer', default: '1' },
    { name: 'signedInAt', dataType: 'date', optional: true },
    { name: 'signedOutAt', dataType: 'date', optional: true },
  ]
}

export default sidUserInput
