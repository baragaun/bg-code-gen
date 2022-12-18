import { BgCodeGenClassConfig } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const baseModelMetadata: BgCodeGenClassConfig = {
  name: 'BaseModelMetadata',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: '../mm-backend-core/src/services/accounts/types/classes/BaseModelMetadata.ts',
  dbCollectionName: 'user-metadata',
  active: true,
  attributes: [
    { name: 'latestActivityAt', dataType: 'Date', optional: true },
  ]
}

export default baseModelMetadata
