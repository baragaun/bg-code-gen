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
    { name: 'species', dataType: 'string' },
    { name: 'subSpecies', dataType: 'string' },
    { name: 'family', dataType: 'string' },
    { name: 'familyname', dataType: 'string' },
    { name: 'discoveredAt', dataType: 'date', optional: true },
    { name: 'extinctSince', dataType: 'date', optional: true },
  ]
}

export default animal
