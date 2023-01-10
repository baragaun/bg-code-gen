import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const nonMemberInfo: TypeGraphqlClass = {
  name: 'NonMemberInfo',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/messaging/types/classes/NonMemberInfo.ts',
  active: true,
  attributes: [
    { name: 'firstName', dataType: 'string', optional: true },
    { name: 'lastName', dataType: 'string', optional: true },
    { name: 'email', dataType: 'string', optional: true },
    { name: 'phoneNumber', dataType: 'string', optional: true },
  ]
}

export default nonMemberInfo
