import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const modelEvent: TypeGraphqlClass = {
  name: 'ModelEvent',
  graphqlType: GraphqlType.ObjectType,
  path: '/src/services/models/types/ModelEvent.ts',
  active: true,
  attributes: [
    { name: 'time', dataType: 'Date', default: 'new Date()' },
    { name: 'modelEventType', dataType: 'ModelEventType', default: 'ModelEventType.INFO' },
    { name: 'message', dataType: 'string', default: '' },
  ]
}

export default modelEvent
