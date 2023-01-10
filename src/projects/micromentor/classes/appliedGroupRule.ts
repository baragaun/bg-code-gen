import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const appliedGroupRule: TypeGraphqlClass = {
  name: 'AppliedGroupRule',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/groups/types/classes/AppliedGroupRule.ts',
  dbCollectionName: 'applied-group-rules',
  active: true,
  attributes: [
    { name: 'groupRuleId', dataType: 'id', default: '\'\'', optional: false },
    { name: 'groupId', dataType: 'id', default: '\'\'', optional: false },
    { name: 'subscribedToEvents', dataType: 'GroupRuleEventType[]', default: '[]' },
  ]
}

export default appliedGroupRule
