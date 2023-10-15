import { GraphqlType, TaskType } from './enums.js'

export interface TypeGraphqlAttr {
  name: string
  dataType: string
  gqlType?: string
  default?: string
  optional?: boolean
  addOptionalDecorator?: boolean
  exposeToGraphQl?: boolean
  orNull?: boolean
  comment?: string
  description?: string
}

export interface TypeGraphqlClass {
  name: string
  active?: boolean | null
  graphqlType?: GraphqlType
  extends?: string | null
  path?: string | null
  dbCollectionName?: string | null
  attributes: TypeGraphqlAttr[]
  backUpFiles?: boolean | null
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
