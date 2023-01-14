import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const appliedGroupRuleInput: TypeGraphqlClass = {
  name: 'AppliedGroupRuleInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/groups/types/classes/AppliedGroupRuleInput.ts',
  active: true,
  attributes: [
    { name: 'groupRuleId', dataType: 'id', default: '\'\'', optional: false },
    { name: 'groupId', dataType: 'id', default: '\'\'', optional: false },
    { name: 'subscribedToEvents', dataType: 'GroupRuleEventType[]', default: '[]' },
  ]
}

export default appliedGroupRuleInput
