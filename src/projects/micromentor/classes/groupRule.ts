import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupRule: TypeGraphqlClass = {
  name: 'GroupRule',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/accounts/types/classes/GroupRule.ts',
  dbCollectionName: 'group-rules',
  active: true,
  attributes: [
    { name: 'name', dataType: 'GroupRuleName', default: 'GroupRuleName.unknown' },
    { name: 'description', dataType: 'string', default: '\'\'' },
    { name: 'config', dataType: 'GroupRuleBaseConfig', default: '{}' },
  ]
}

export default groupRule
