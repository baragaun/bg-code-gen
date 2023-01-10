import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const groupMemberInput: TypeGraphqlClass = {
  name: 'GroupMemberInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/groups/types/classes/GroupMemberInput.ts',
  active: true,
  attributes: [
    { name: 'groupMemberInputId', dataType: 'id' },
    { name: 'userId', dataType: 'id' },
    { name: 'roles', dataType: 'GroupMemberRole[]', default: '[]' },
  ]
}

export default groupMemberInput
