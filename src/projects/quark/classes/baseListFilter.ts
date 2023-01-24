import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseListFilter: TypeGraphqlClass = {
  name: 'BaseListFilter',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/models/types/BaseListFilter.ts',
  active: true,
  attributes: [
    { name: 'ids', dataType: 'string[]' },
    { name: 'searchText', dataType: 'string' },
    { name: 'createdAtFrom', dataType: 'date' },
    { name: 'createdAtUntil', dataType: 'date' },
    { name: 'updatedAtFrom', dataType: 'date' },
    { name: 'updatedAtUntil', dataType: 'date' },
  ]
}

export default baseListFilter
