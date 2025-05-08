import { GraphqlType } from './enums.js'

export type DataType = 'string' |
  'integer' |
  'float' |
  'boolean' |
  'date' |
  'id' |
  any;

export type SchemaType = 'string' |
  'number' |
  'boolean' |
  'object' |
  'array' |
  'date' |
  'id' |
  any;

export interface EnumInfo {
  name: string;
  values: string[];
  description?: string;
}

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
  isEnum?: boolean
  maxLength?: number
  comment?: string
  description?: string
  deprecationReason?: string
  schema?: {
    type?: SchemaType
    modelType?: SchemaType
    arrayItemType?: SchemaType
    arrayItemObject?: string
    skip?: boolean
  }
}

export interface BgModelDef {
  name: string;
  description?: string;
  sourceProject: string;
  version?: number;
  primaryKey?: string;
  graphqlType?: GraphqlType;
  extends?: string | null;
  classFilePath?: string | null;
  dbCollectionName?: string | null;
  attributes: TypeGraphqlAttr[];
  required?: string[];
  isTypeOrmModel?: boolean | null;
  backUpFiles?: boolean | null;
  generateJsonSchema?: boolean | null;
}

abstract interface BgCodeGenTask {
  taskType: string;
  modelDefs: BgModelDef[];
  enabled: boolean;
}

export interface TypeGraphqlTask extends BgCodeGenTask {
}

export interface JsonSchemaTask extends BgCodeGenTask {
  outputType?: SchemaOutputType;
  enumInfos?: EnumInfo[];
  graphqlUrl?: string;
  schemaIdUrl?: string;
}

export interface MongooseSchemaTask extends BgCodeGenTask {
  enumInfos?: EnumInfo[];
}

export interface SourceProject {
  name: string;
  rootPath: string;
  enabled?: boolean;
  jsonSchemaPath?: string;
  mongooseSchemaPath?: string;
}

export interface BgCodeGenProject {
  sourceProjects: SourceProject[];
  tasks: BgCodeGenTask[];
}

export interface FileSection {
  tag: string;
  indent: number;
  lines: string[];
}

// // Basic JSON Schema type definitions
// interface JSONSchema {
//   $id?: string;
//   $schema?: string;
//   title?: string;
//   description?: string;
//   type?: JSONSchemaType | JSONSchemaType[];
//   definitions?: Record<string, JSONSchema>;
//   properties?: Record<string, JSONSchema>;
//   required?: string[];
//   additionalProperties?: boolean | JSONSchema;
//   allOf?: JSONSchema[];
//   anyOf?: JSONSchema[];
//   oneOf?: JSONSchema[];
//   not?: JSONSchema;
//   if?: JSONSchema;
//   then?: JSONSchema;
//   else?: JSONSchema;
//   format?: string;
//   enum?: any[];
//   const?: any;
//   default?: any;
//   examples?: any[];
//
//   // Array-specific
//   items?: JSONSchema | JSONSchema[];
//   contains?: JSONSchema;
//   minItems?: number;
//   maxItems?: number;
//   uniqueItems?: boolean;
//
//   // String-specific
//   minLength?: number;
//   maxLength?: number;
//   pattern?: string;
//
//   // Number-specific
//   minimum?: number;
//   maximum?: number;
//   exclusiveMinimum?: number | boolean;
//   exclusiveMaximum?: number | boolean;
//   multipleOf?: number;
// }
//
// // JSON Schema types
// type JSONSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null';
