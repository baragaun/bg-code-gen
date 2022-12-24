import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const user: TypeGraphqlClass = {
  name: 'FindObjectsOptions',
  graphqlType: GraphqlType.InputType,
  path: 'src/services/db/types/FindObjectsOptions.ts',
  active: true,
  attributes: [
    { name: 'limit', dataType: 'integer' },
    { name: 'sort', dataType: 'string' },
    { name: 'skip', dataType: 'integer' },
    { name: 'timeout', dataType: 'boolean' },
    { name: 'tailable', dataType: 'boolean' },
    { name: 'awaitData', dataType: 'boolean' },
    { name: 'batchSize', dataType: 'integer' },
    { name: 'returnKey', dataType: 'boolean' },
    { name: 'maxTimeMS', dataType: 'integer' },
    { name: 'maxAwaitTimeMS', dataType: 'integer' },
    { name: 'noCursorTimeout', dataType: 'boolean' },
    { name: 'singleBatch', dataType: 'boolean' },
    { name: 'allowPartialResults', dataType: 'boolean' },
    { name: 'showRecordId', dataType: 'boolean' },
    { name: 'includeDeleted', dataType: 'boolean' },
  ]
}

export default user
