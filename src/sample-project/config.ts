import {
  BgCodeGenProject,
  TypeGraphqlTask,
} from '../types.js'
import { TaskType } from '../enums.js'
import animal from './classes/animal.js'

const syncTypeGraphqlClassesTask: TypeGraphqlTask = {
  taskType: TaskType.typeGraphql,
  projectRoot: '../sample-mother-project',
  mongoDbCollectionsPath: '/src/services/db/mongoDb/helpers/collections.ts',
  active: true,
  classes: [
    animal,
  ],
}

const config: BgCodeGenProject = {
  tasks: [
    syncTypeGraphqlClassesTask,
  ]
}

export default config
