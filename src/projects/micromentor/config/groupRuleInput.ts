import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupRuleInput: TypeGraphqlClass = {
  name: 'groupRuleInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/groupRuleInput.ts',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string', default: '\'\'' },
    { name: 'description', dataType: 'string', default: '\'\'' },
    { name: 'config', dataType: 'GroupRuleBaseConfig', default: '{}' },
  ]
}

export default groupRuleInput
