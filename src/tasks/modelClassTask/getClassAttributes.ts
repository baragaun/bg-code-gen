import {
  BgModelDef,
  ModelClassTask,
  BgModelDefModelClassTaskConfig,
  BgCodeGenProject,
  SourceProject,
} from '../../types.js'
import { GraphqlType } from '../../enums.js'
import getTypeScriptTypeText from './getTypeScriptTypeText.js'
import { getGqlType } from './getGqlType.js'
import { getDefaultText } from './getDefaultText.js'
import getAllPropertyDefsForModelDef from '../helpers/getAllPropertyDefsForModelDef.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'

// Escapes a string for embedding inside a single-quoted JS string literal — backslashes first,
// then single quotes, then line breaks, so a modelDef's description/deprecationReason containing
// an apostrophe (e.g. "the user's session") or a raw newline (common in multi-line GraphQL SDL
// descriptions) doesn't break out of the generated literal and corrupt every subsequent line of
// the file. A single-quoted JS string literal can't contain a literal line break any more than it
// can contain an unescaped quote.
export const escapeForSingleQuotedString = (s: string): string => s
  .replace(/\\/g, '\\\\')
  .replace(/'/g, '\\\'')
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '\\r')

const getClassAttributes = (
  modelDef: BgModelDef,
  task: ModelClassTask,
  modelDefTaskConfig: BgModelDefModelClassTaskConfig,
  outSourceProject: SourceProject,
  project: BgCodeGenProject,
  indentLevel: number,
): string[] => {
  const isInputType = modelDef.graphqlType === GraphqlType.InputType
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.attr >>Note: Code is generated between these markers<<')

  const tags = (project.tags || []).concat(modelDefTaskConfig.tags || [])
  let attributes = modelDefTaskConfig.mergeParentClasses
    ? getAllPropertyDefsForModelDef(modelDef, task, modelDefTaskConfig, project)
    : modelDef.attributes.filter(p => haveCommonTags(tags, p.tags));

  if (Array.isArray(modelDefTaskConfig.removeProps) && modelDefTaskConfig.removeProps.length > 0) {
    attributes = attributes.filter(attr => !modelDefTaskConfig.removeProps!.includes(attr.name));
  }

  for (const attr of attributes) {
    const fieldDecoratorOptions: string[] = []

    if (attr.comment) {
      if (attr.comment.startsWith('//')) {
        lines.push(prefix + attr.comment)
      } else {
        lines.push(prefix + '// ' + attr.comment)
      }
    }

    if (modelDef.isTypeOrmModel && !isInputType) {
      if (attr.isPrimaryKeyField) {
        lines.push(prefix + '@ObjectIdColumn()')
      } else {
        lines.push(prefix + '@Column()')
      }
    }

    let isOptional = (
      (
        (isInputType && !attr.default) ||
        (!isInputType && !!attr.optional)
      ) &&
      attr.optional !== false
    )

    if (isOptional) {
      fieldDecoratorOptions.push('nullable: true')
    }

    if (attr.description) {
      fieldDecoratorOptions.push(`description: '${escapeForSingleQuotedString(attr.description)}'`)
    }

    if (attr.deprecationReason) {
      fieldDecoratorOptions.push(`deprecationReason: '${escapeForSingleQuotedString(attr.deprecationReason)}'`)
    }

    const fieldDecoratorOptionsArg = fieldDecoratorOptions.length > 0
      ? `, {\n${prefix}${prefix}${fieldDecoratorOptions.join(`,\n${prefix}${prefix}`)},\n${prefix}}`
      : ''

    if (
      modelDefTaskConfig.addTypeGraphqlDecorators &&
      modelDef.graphqlType &&
      attr.exposeToGraphQl !== false
    ) {
      // GraphQL @Field tag:
      lines.push(prefix + `@Field(_type => ${getGqlType(attr, isInputType)}${fieldDecoratorOptionsArg})`)
      if (isOptional || attr.addOptionalDecorator) {
        lines.push(prefix + '@IsOptional()')
      }
      if (attr.dataType.startsWith('string')) {
        if (attr.minLength && attr.minLength > 0) {
          lines.push(prefix + `@MinLength(${attr.minLength})`)
        }
        if (attr.maxLength && attr.maxLength > 0) {
          lines.push(prefix + `@MaxLength(${attr.maxLength})`)
        }
      }
    }

    // Variable declaration:
    const typescriptText = getTypeScriptTypeText(
      attr,
      isInputType,
      isOptional,
      !!modelDefTaskConfig.useStringForDate,
    )
    const declareText = attr.addDeclare
      ? 'declare '
      : ''
    const semiColon = outSourceProject.addSemicolon === undefined || outSourceProject.addSemicolon
      ? ';'
      : ''
    const defaultText = getDefaultText(attr, isOptional, modelDefTaskConfig.useStringForDate)
    lines.push(
      prefix +
      `${declareText}public ${attr.name}${typescriptText}${defaultText}${semiColon}` +
      (modelDefTaskConfig.addTypeGraphqlDecorators && modelDef.graphqlType ? "\n" : ''),
    )
  }

  if (
    modelDefTaskConfig.addTypeGraphqlDecorators &&
    modelDef.graphqlType &&
    modelDef.attributes.length > 0
  ) {
    // Removing the double new line of the last attribute:
    lines[lines.length - 1] = lines[lines.length - 1].substring(0, lines[lines.length - 1].length - 1)
  }

  lines.push(prefix + '// @bg-codegen:/class.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getClassAttributes
