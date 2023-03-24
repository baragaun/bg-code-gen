import { GraphqlType, TaskType } from './enums.js'

export interface TypeGraphqlAttr {
  name: string
  dataType: string
  gqlType?: string
  default?: string
  optional?: boolean
  addOptionalDecorator?: boolean
  exposeToGraphQl?: boolean
  comment?: string
}

export interface TypeGraphqlClass {
  name: string
  active?: boolean
  graphqlType: GraphqlType
  extends?: string
  path?: string
  dbCollectionName?: string
  attributes: TypeGraphqlAttr[]
  backUpFiles?: boolean
}

abstract interface BgCodeGenTask {
  taskType: string
  projectRoot: string
}

export interface TypeGraphqlTask extends BgCodeGenTask {
  taskType: TaskType
  active: boolean,
  mongoDbCollectionsPath: string
  classes: TypeGraphqlClass[]
}

export interface BgCodeGenProject {
  tasks: SyncTypeTaskConfig[]
}

export interface FileSection {
  tag: string
  indent: number
  lines: string[]
}
