import {
  BgModelDef,
  ModelClassTask,
  BgModelDefModelClassTaskConfig, BgCodeGenProject
} from '../../types.js'
import { GraphqlType } from '../../enums.js'
import getTypeScriptTypeText from './getTypeScriptTypeText.js'
import { getGqlType } from './getGqlType.js'
import { getDefaultText } from './getDefaultText.js'
import getAllPropertyDefsForModelDef from '../helpers/getAllPropertyDefsForModelDef.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'

const getClassAttributes = (
  modelDef: BgModelDef,
  task: ModelClassTask,
  modelDefTaskConfig: BgModelDefModelClassTaskConfig,
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
      fieldDecoratorOptions.push(`description: '${attr.description}'`)
    }

    if (attr.deprecationReason) {
      fieldDecoratorOptions.push(`deprecationReason: '${attr.deprecationReason}'`)
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
    }

    // Variable declaration:
    const typescriptText = getTypeScriptTypeText(
      attr,
      isInputType,
      isOptional,
      !!modelDefTaskConfig.useStringForDate,
    )
    const declareText = attr.addDeclare ? 'declare ' : ''
    const defaultText = getDefaultText(attr, isOptional, modelDefTaskConfig.useStringForDate)
    lines.push(
      prefix +
      `${declareText}public ${attr.name}${typescriptText}${defaultText};` +
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
