import { BgModelDef } from '../../types.js'
import { GraphqlType, TaskType } from '../../enums.js'

const animal: BgModelDef = {
  sourceProject: 'sample-project',
  name: 'Animal',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  taskConfigs: [
    {
      taskType: TaskType.modelClass,
      sourceProject: 'sample-project',
      addTypeGraphqlDecorators: true,
      path: 'src/services/zoo/types/classes/Animal.ts',
    },
  ],
  dbCollectionName: 'animals',
  attributes: [
    { name: 'name', dataType: 'string' },
    { name: 'species', dataType: 'string' },
  ]
}

export default animal
