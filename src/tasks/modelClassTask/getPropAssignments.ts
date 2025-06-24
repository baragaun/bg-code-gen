import {
  BgModelDef,
  ModelClassTask,
  BgModelDefModelClassTaskConfig,
  BgCodeGenProject,
  SourceProject
} from '../../types.js'
import getAllPropertyDefsForModelDef from '../helpers/getAllPropertyDefsForModelDef.js'
import { haveCommonTags } from '../helpers/haveCommonTags.js'

const getPropAssignments = (
  modelDef: BgModelDef,
  task: ModelClassTask,
  modelDefTaskConfig: BgModelDefModelClassTaskConfig,
  outSourceProject: SourceProject,
  project: BgCodeGenProject,
  indentLevel: number,
): string[] => {
  let lines: string[] = []
  const prefix = '                          '.substring(0, indentLevel)

  lines.push(prefix + '// @bg-codegen:class.const.attr >>Note: Code is generated between these markers<<')

  const tags = (project.tags || []).concat(modelDefTaskConfig.tags || [])
  let attributes = modelDefTaskConfig.mergeParentClasses
    ? getAllPropertyDefsForModelDef(modelDef, task, modelDefTaskConfig, project)
    : modelDef.attributes.filter(p => haveCommonTags(tags, p.tags));

  if (Array.isArray(modelDefTaskConfig.removeProps) && modelDefTaskConfig.removeProps.length > 0) {
    attributes = attributes.filter(attr => !modelDefTaskConfig.removeProps!.includes(attr.name));
  }

  const semiColon = outSourceProject.addSemicolon === undefined || outSourceProject.addSemicolon
    ? ';'
    : ''
  for (const attr of attributes) {
    if (attr.dataType.toLowerCase() === 'float' || attr.dataType.toLowerCase() === 'integer') {
      lines.push(prefix + `if (`)
      lines.push(prefix + `  attributes.${attr.name} === null ||`)
      lines.push(prefix + `  attributes.${attr.name} === 0 ||`)
      lines.push(prefix + `  (`)
      lines.push(prefix + `    attributes.${attr.name} &&`)
      lines.push(prefix + `    !isNaN(attributes.${attr.name})`)
      // lines.push(prefix + `if (attributes.${attr.name} === 0 || (attributes.${attr.name} && !isNaN(attributes.${attr.name}))) {`)
      lines.push(prefix + `  )`)
      lines.push(prefix + `) {`)
    } else if (attr.dataType.toLowerCase() === 'date' && modelDefTaskConfig.useStringForDate) {
      lines.push(prefix + `if (attributes.${attr.name} !== undefined && attributes.${attr.name} !== '') {`)
    } else {
      lines.push(prefix + `if (attributes.${attr.name} !== undefined) {`)
    }

    if (attr.dataType.toLowerCase() === 'date' && !modelDefTaskConfig.useStringForDate) {
      lines.push(prefix + `  this.${attr.name} = attributes.${attr.name} instanceof Date`)
      lines.push(prefix + `    ? new Date(attributes.${attr.name})`)
      lines.push(prefix + `    : attributes.${attr.name}${semiColon}`)
    } else {
      lines.push(prefix + `  this.${attr.name} = attributes.${attr.name}${semiColon}`)
    }
    lines.push(prefix + `}`)
  }

  lines.push(prefix + '// @bg-codegen:/class.const.attr >>Note: Code is generated between these markers<<')

  return lines
}

export default getPropAssignments
