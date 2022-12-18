export interface BgCodeGenAttributeConfig {
  name: string
  dataType: string
  default?: string
  optional?: boolean
}

export interface BgCodeGenClassConfig {
  name: string
  objectPath: string
  inputPath: string
  dbCollectionName: string
  attributes: BgCodeGenAttributeConfig[]
}

abstract interface BgCodeGenTask {
  name: string
}

export interface SyncTypeGraphqlClassesTask extends BgCodeGenTask {
  name: 'sync-type-graphql-class'
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
