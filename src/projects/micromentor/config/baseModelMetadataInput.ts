import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseModelMetadataInput: BgCodeGenClassConfig = {
  name: 'BaseModelMetadataInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: '../mm-backend-core/src/services/accounts/types/classes/BaseModelMetadataInput.ts',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default baseModelMetadataInput
