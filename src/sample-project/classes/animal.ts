import { BgModelDef } from '../../types.js'
import { GraphqlType } from '../../enums.js'

const animal: BgModelDef = {
  sourceProject: 'sample-project',
  name: 'Animal',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  classFilePath: 'src/services/zoo/types/classes/Animal.ts',
  dbCollectionName: 'animals',
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'species', dataType: 'string' },
  ]
}

export default animal
