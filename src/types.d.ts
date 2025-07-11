import { GraphqlType, TaskType } from './enums.js'
import * as prettier from 'prettier'

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
  values: (string | null)[];
  description?: string;
}

export interface ModelPropDef {
  name: string
  dataType: DataType
  isPrimaryKeyField?: boolean | null
  gqlType?: string
  default?: string
  optional?: boolean
  addDeclare?: boolean
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
  tags?: string[]
}

/** deprecated: Use ModelPropDef instead */
export type TypeGraphqlAttr = ModelPropDef

export interface BgModelDefTaskConfig {
  taskType: TaskType;
  sourceProject: string;
  path: string;
  tags?: string[];
  removeProps?: string[];
  useStringForDate?: boolean;
}

export interface BgModelDefModelClassTaskConfig extends BgModelDefTaskConfig {
  mergeParentClasses?: boolean;
  addTypeGraphqlDecorators?: boolean;
}

export interface BgModelDefJsonSchemaTaskConfig extends BgModelDefTaskConfig {
  outputType?: SchemaOutputType;
}

export interface BgModelDefMongooseSchemaTaskConfig extends BgModelDefTaskConfig {
  suppressReservedKeysWarning?: boolean;
}

export interface BgModelDef {
  name: string;
  description?: string;
  sourceProject: string;
  tags?: string[];
  version?: number;
  primaryKey?: string;
  graphqlType?: GraphqlType;
  extends?: string | null;
  taskConfigs?: (BgModelDefTaskConfig | BgModelDefModelClassTaskConfig | BgModelDefJsonSchemaTaskConfig | BgModelDefMongooseSchemaTaskConfig)[];
  dbCollectionName?: string | null;
  attributes: ModelPropDef[];
  required?: string[];
  isTypeOrmModel?: boolean | null;
  backUpFiles?: boolean | null;
}

abstract interface BgCodeGenTask {
  taskType: string;
  modelDefs: BgModelDef[];
  enabled: boolean;
}

export interface ModelClassTask extends BgCodeGenTask {
  // enableTypeGraphqlDecorators?: boolean;
}

/** deprecated: Use ModelClassTask instead */
export type TypeGraphqlTask = ModelClassTask;

export interface JsonSchemaTask extends BgCodeGenTask {
  enumInfos?: EnumInfo[];
  graphqlUrl?: string;
  schemaIdUrl?: string;
}

export interface MongooseSchemaTask extends BgCodeGenTask {
  enumInfos?: EnumInfo[];
  suppressReservedKeysWarning?: boolean;
}

export interface SourceProject {
  name: string;
  rootPath: string;
  enabled?: boolean;
  addSemicolon?: boolean;
}

export interface BgCodeGenProject {
  sourceProjects: SourceProject[];
  tasks: BgCodeGenTask[];
  tags?: string[];
}

export interface FileSection {
  tag: string;
  indent: number;
  lines: string[];
}

type ExportType = 'none' | 'named' | 'default';

interface GenerateTypeScriptOptions {
  varName: string;
  exportType?: ExportType;
  prettier?: prettier.Options;
  filePath?: string;
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
