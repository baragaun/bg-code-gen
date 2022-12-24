import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupRuleBaseConfig: TypeGraphqlClass = {
  name: 'GroupRuleBaseConfig',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/accounts/types/classes/GroupRuleBaseConfig.ts',
  active: true,
  attributes: [
    // { name: 'name', dataType: 'string', default: '\'\'' },
    // { name: 'description', dataType: 'string', default: '\'\'' },
    // { name: 'config', dataType: 'GroupRuleBaseConfig', default: '{}' },
  ]
}

export default groupRuleBaseConfig
