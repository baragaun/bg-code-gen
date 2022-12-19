import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userMetadataInput: TypeGraphqlClass = {
  name: 'UserMetadataInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelMetadataInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/UserMetadataInput.ts',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default userMetadataInput
