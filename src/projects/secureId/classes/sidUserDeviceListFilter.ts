import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userDeviceListFilter: TypeGraphqlClass = {
  name: 'SidUserDeviceListFilter',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseListFilter',
  path: 'src/services/secureId/types/classes/SidUserDeviceListFilter.ts',
  active: true,
  attributes: [
  ]
}

export default userDeviceListFilter
