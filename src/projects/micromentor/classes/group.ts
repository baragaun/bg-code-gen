import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const group: TypeGraphqlClass = {
  name: 'Group',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/groups/types/classes/Group.ts',
  dbCollectionName: 'groups',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'slug', dataType: 'string', optional: true },
    { name: 'parentGroupId', dataType: 'id', optional: true },
  ]
}

export default group
