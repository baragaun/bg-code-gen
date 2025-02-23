import { GraphqlType } from './enums.js'

export type DataType = 'string' |
  'integer' |
  'float' |
  'boolean' |
  'date' |
  'id' |
  any
export type SchemaType = 'string' |
  'number' |
  'boolean' |
  'object' |
  'array' |
  'date' |
  'id' |
  any

export interface TypeGraphqlAttr {
  name: string
  dataType: DataType
  isPrimaryKeyField?: boolean | null
  gqlType?: string
  default?: string
  optional?: boolean
  addOptionalDecorator?: boolean
  exposeToGraphQl?: boolean
  orNull?: boolean
  maxLength?: number
  comment?: string
  description?: string
  schema?: {
    type?: SchemaType
    modelType?: SchemaType
    arrayItemType?: SchemaType
    arrayItemObject?: string
    skip?: boolean
  }
}

export interface TypeGraphqlClass {
  name: string
  description?: string
  version?: number
  primaryKey?: string
  active?: boolean | null
  graphqlType?: GraphqlType
  extends?: string | null
  path?: string | null
  schemaPath?: string | null
  dbCollectionName?: string | null
  attributes: TypeGraphqlAttr[]
  required?: string[]
  isTypeOrmModel?: boolean | null
  backUpFiles?: boolean | null
}

abstract interface BgCodeGenTask {
  taskType: string
  projectRoot: string
  active: boolean
}

export interface TypeGraphqlTask extends BgCodeGenTask {
  mongoDbCollectionsPath: string
  classes: TypeGraphqlClass[]
}

export interface JsonSchemaTask extends BgCodeGenTask {
  models: TypeGraphqlClass[]
}

export interface BgCodeGenProject {
  tasks: SyncTypeTaskConfig[]
}

export interface FileSection {
  tag: string
  indent: number
  lines: string[]
}
