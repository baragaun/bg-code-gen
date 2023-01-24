import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const userAuthResponse: TypeGraphqlClass = {
  name: 'SystemHealthReport',
  graphqlType: GraphqlType.ObjectType,
  path: 'src/services/system/types/SystemHealthReport.ts',
  active: true,
  attributes: [
    { name: 'environment', dataType: 'string' },
    { name: 'ok', dataType: 'boolean', default: 'false' },
    { name: 'db', dataType: 'boolean', default: 'false' },
    { name: 'email', dataType: 'boolean', default: 'false' },
    { name: 'redis', dataType: 'boolean', default: 'false' },
    { name: 'pushNotifications', dataType: 'boolean', default: 'false' },
    { name: 'sms', dataType: 'boolean', default: 'false' },
    { name: 'tasks', dataType: 'boolean', default: 'false' },
  ]
}

export default userAuthResponse
