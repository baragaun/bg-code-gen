import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userDevice: TypeGraphqlClass = {
  name: 'UserDevice',
  graphqlType: GraphqlType.ObjectType,
  extends: 'SidUserDevice',
  path: 'src/services/accounts/types/classes/UserDevice.ts',
  dbCollectionName: 'user-devices',
  active: true,
  attributes: [
  ]
}

export default userDevice
