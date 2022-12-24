import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const mentorsGroupMember: TypeGraphqlClass = {
  name: 'MentorsGroupMember',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/accounts/types/classes/groups/mentors/MentorsGroupMember.ts',
  active: true,
  attributes: [
    { name: 'expertises', dataType: 'Expertise[]', default: '[]' },
    { name: 'industries', dataType: 'Industry[]', default: '[]' },
  ]
}

export default mentorsGroupMember
