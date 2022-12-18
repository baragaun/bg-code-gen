import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const group: BgCodeGenClassConfig = {
  name: 'Group',
  active: true,
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: '../mm-backend-core/src/services/accounts/types/classes/Group.ts',
  dbCollectionName: 'groups',
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'slug', dataType: 'string', optional: true },
  ]
}

export default group
