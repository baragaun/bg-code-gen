import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const expertise: TypeGraphqlClass = {
  name: 'Expertise',
  graphqlType: GraphqlType.ObjectType,
  path: '../mm-backend-core/src/services/accounts/types/classes/Expertise.ts',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string', default: '\'\'' },
  ]
}

export default expertise
