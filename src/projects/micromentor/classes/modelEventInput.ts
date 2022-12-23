import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const modelEventInput: TypeGraphqlClass = {
  name: 'ModelEventInput',
  graphqlType: GraphqlType.InputType,
  path: '/src/services/models/types/ModelEventInput.ts',
  active: true,
  attributes: [
    { name: 'time', dataType: 'Date', default: 'new Date()' },
    { name: 'modelEventInputType', dataType: 'ModelEventInputType', default: 'ModelEventInputType.INFO' },
    { name: 'message', dataType: 'string', default: '' },
  ]
}

export default modelEventInput
