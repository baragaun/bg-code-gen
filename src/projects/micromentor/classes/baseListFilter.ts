import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseListFilter: TypeGraphqlClass = {
  name: 'BaseListFilter',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/models/types/BaseListFilter.ts',
  active: true,
  attributes: [
    { name: 'modelType', dataType: 'ModelType', optional: false },
    { name: 'ids', dataType: 'string[]' },
    { name: 'searchText', dataType: 'string' },
    { name: 'includeDeleted', dataType: 'boolean' },
    { name: 'version', dataType: 'integer' },
    { name: 'offset', dataType: 'integer' },
    { name: 'limit', dataType: 'integer' },
    { name: 'orderBy', dataType: 'string' },
    { name: 'orderByRaw', dataType: 'string' },
    { name: 'orderByDirection', dataType: '\'asc\' | \'desc\'', gqlType: 'String' },
    { name: 'createdAtFrom', dataType: 'date' },
    { name: 'createdAtUntil', dataType: 'date' },
    { name: 'updatedAtFrom', dataType: 'date' },
    { name: 'updatedAtUntil', dataType: 'date' },
  ]
}

export default baseListFilter
