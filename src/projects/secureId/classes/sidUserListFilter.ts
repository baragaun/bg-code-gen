import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userListFilter: TypeGraphqlClass = {
  name: 'SidUserListFilter',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseListFilter',
  path: 'src/services/secureId/types/classes/SidUserListFilter.ts',
  active: true,
  attributes: [
    { name: 'roles', dataType: 'UserRole[]' }
  ]
}

export default userListFilter
