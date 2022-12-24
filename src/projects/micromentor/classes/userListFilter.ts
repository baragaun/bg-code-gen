import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userListFilter: TypeGraphqlClass = {
  name: 'UserListFilter',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseListFilter',
  path: 'src/services/accounts/types/classes/UserListFilter.ts',
  active: true,
  attributes: [
    { name: 'roles', dataType: 'UserRole[]' }
  ]
}

export default userListFilter
