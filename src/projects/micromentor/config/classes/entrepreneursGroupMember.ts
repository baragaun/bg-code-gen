import { TypeGraphqlClass } from '../../../../types.js'
import { GraphqlType } from '../../../../enums.js'

const entrepreneursGroupMember: TypeGraphqlClass = {
  name: 'EntrepreneursGroupMember',
  graphqlType: GraphqlType.ObjectType,
  path: '/src/services/accounts/types/classes/groups/mentors/EntrepreneursGroupMember.ts',
  active: true,
  attributes: [
    { name: 'soughtExpertises', dataType: 'Expertise[]', default: '[]' },
    { name: 'industry', dataType: 'Industry', optional: true },
  ]
}

export default entrepreneursGroupMember
