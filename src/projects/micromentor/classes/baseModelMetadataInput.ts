import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseModelMetadataInput: TypeGraphqlClass = {
  name: 'BaseModelMetadataInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/models/types/BaseModelMetadataInput.ts',
  active: true,
  attributes: [
    { name: 'events', dataType: 'ModelEventInput[]', default: '[]' },
  ]
}

export default baseModelMetadataInput
