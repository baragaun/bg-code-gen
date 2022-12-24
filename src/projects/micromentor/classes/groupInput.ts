import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupInput: TypeGraphqlClass = {
  name: 'GroupInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/accounts/types/classes/GroupInput.ts',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'slug', dataType: 'string' },
  ]
}

export default groupInput
