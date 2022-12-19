import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseModelMetadataInput: TypeGraphqlClass = {
  name: 'BaseModelMetadataInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/models/types/BaseModelMetadataInput.ts',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default baseModelMetadataInput
