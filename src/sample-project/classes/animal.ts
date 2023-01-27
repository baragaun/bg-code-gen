import { TypeGraphqlClass } from '../../types.js'
import { GraphqlType } from '../../enums.js'

const animal: TypeGraphqlClass = {
  name: 'Animal',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/zoo/types/classes/Animal.ts',
  dbCollectionName: 'animals',
  active: true,
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'species', dataType: 'string' },
  ]
}

export default animal
