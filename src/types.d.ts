import { TaskType } from './enums.js'

export interface BgCodeGenAttributeConfig {
  name: string
  dataType: string
  default?: string
  optional?: boolean
}

export interface BgCodeGenClassConfig {
  name: string
  active?: boolean
  graphqlType: GraphqlType
  extends?: string
  path?: string
  dbCollectionName?: string
  attributes: BgCodeGenAttributeConfig[]
}

abstract interface BgCodeGenTask {
  taskType: string
}

export interface SyncTypeGraphqlClassesTask extends BgCodeGenTask {
  taskType: TaskType
  active: boolean,
  mongoDbCollectionsPath: string
  classes: BgCodeGenClassConfig[]
}

export interface BgCodeGenConfig {
  tasks: SyncTypeTaskConfig[]
}

export interface FileSection {
  tag: string
  indent: number
  lines: string[]
}
