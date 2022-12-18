import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userMetadata: BgCodeGenClassConfig = {
  name: 'UserMetadata',
  graphqlType: GraphqlType.ObjectType,
  path: '../mm-backend-core/src/services/accounts/types/classes/UserMetadata.ts',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default userMetadata
