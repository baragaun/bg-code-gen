import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userDeviceListFilter: TypeGraphqlClass = {
  name: 'UserDeviceListFilter',
  graphqlType: GraphqlType.InputType,
  extends: 'SidUserDeviceListFilter',
  path: 'src/services/accounts/types/classes/UserDeviceListFilter.ts',
  active: true,
  attributes: [
  ]
}

export default userDeviceListFilter
