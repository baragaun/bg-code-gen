export enum TaskType {
  jsonSchema = 'json-schema',
  modelClass = 'model-class',
  mongooseSchema = 'mongoose-schema',

  /** deprecated, use modelClass instead */
  typeGraphql = 'type-graphql',
}

export enum GraphqlType {
  ObjectType = 'ObjectType',
  InputType = 'InputType',
}

export enum SchemaOutputType {
  ts = 'ts',
  json = 'json',
}
