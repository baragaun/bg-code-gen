import {
  BgCodeGenProject,
  BgModelDefTaskConfig,
  MongooseSchemaTask,
  ModelPropDef
} from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js'

const convertPropDefToProperty = (
  propDef: ModelPropDef,
  nestedModelNames: string[],
  level: number,
  task: MongooseSchemaTask,
  modelTaskConfig: BgModelDefTaskConfig,
  project: BgCodeGenProject,
): string => {
  if (propDef.schema?.skip || propDef.name === 'id') {
    return '';
  }

  const indention = '  '.repeat(level + 1);
  const isArray = propDef.dataType.endsWith('[]');
  const dataType = isArray
    ? propDef.dataType.substring(0, propDef.dataType.length - 2)
    : propDef.dataType;

  if (Array.isArray(task.enumInfos) && task.enumInfos.length > 0) {
    const enumInfo = task.enumInfos.find(e => e.name === dataType);

    if (enumInfo) {
      const typeValue = isArray ? '[String]' : 'String';
      if (!propDef.default) {
        return `${indention}${propDef.name}: ${typeValue}`;
      }

      const parts = [`type: ${typeValue}`];
      if (propDef.default) {
        parts.push(`default: ${propDef.default}`);
      }

      return `${indention}${propDef.name}: { ${parts.join(', ')} }`;
    }
  }

  const referencedModelDef = task.modelDefs
    .find(m => m.name === dataType);

  if (referencedModelDef) {
    const nestedProperties = getPropertiesForModelDef(
      referencedModelDef,
      nestedModelNames,
      level + 1,
      task,
      modelTaskConfig,
      project,
    );
    if (nestedProperties && nestedProperties.length > 0) {
      return `${indention}${propDef.name}: {` +
        '\n' +
        nestedProperties.join(',\n') +
        ',\n' +
        indention + '}';
    }
  }

  if (
    dataType.toLowerCase() === 'string' ||
    dataType.toLowerCase() === 'id'
  ) {
    const typeValue = isArray ? '[String]' : 'String';
    if (!propDef.default) {
      return `${indention}${propDef.name}: ${typeValue}`;
    }

    const parts = [`type: ${typeValue}`];
    if (propDef.default) {
      parts.push(`default: ${propDef.default}`);
    }

    return `${indention}${propDef.name}: { ${parts.join(', ')} }`;

    // let maxLength = propDef.maxLength
    // if (!maxLength && dataType.toLowerCase() === 'id') {
    //   // ee3b6cab23204e79a203f9504128c748
    //   maxLength = 32;
    // }
    //
    // if (maxLength) {
    //   prop.maxLength = maxLength;
    // }
  }

  if (dataType.toLowerCase() === 'boolean') {
    const typeValue = isArray ? '[Boolean]' : 'Boolean';
    if (!propDef.default) {
      return `${indention}${propDef.name}: ${typeValue}`;
    }

    const parts = [`type: ${typeValue}`];
    if (propDef.default) {
      parts.push(`default: ${propDef.default}`);
    }

    return `${indention}${propDef.name}: { ${parts.join(', ')} }`;
  }

  if (dataType.toLowerCase() === 'date') {
    const typeValue = isArray ? '[Date]' : 'Date';
    if (!propDef.default) {
      return `${indention}${propDef.name}: ${typeValue}`;
    }

    const parts = [`type: ${typeValue}`];
    if (propDef.default) {
      const defaultValue = propDef.default === 'new Date()'
        ? 'Date.now'
        : propDef.default;
      parts.push(`default: ${defaultValue}`);
    }

    return `${indention}${propDef.name}: { ${parts.join(', ')} }`;
  }

  if (
    dataType.toLowerCase() === 'float' ||
    dataType.toLowerCase() === 'integer'
  ) {
    const typeValue = isArray ? '[Number]' : 'Number';
    if (!propDef.default) {
      return `${indention}${propDef.name}: ${typeValue}`;
    }
    const parts = [`type: ${typeValue}`];
    if (propDef.default) {
      parts.push(`default: ${propDef.default}`);
    }

    return `${indention}${propDef.name}: { ${parts.join(', ')} }`;
  }

  if (
    dataType.toLowerCase() === 'json' ||
    dataType.toLowerCase() === 'object'
  ) {
    const typeValue = isArray ? '[Object]' : 'Object';
    if (!propDef.default) {
      return `${indention}${propDef.name}: ${typeValue}`;
    }
    const parts = [`type: ${typeValue}`];
    if (propDef.default) {
      parts.push(`default: ${propDef.default}`);
    }

    return `${indention}${propDef.name}: { ${parts.join(', ')} }`;
  }

  // Unrecognized dataType: not a registered enum, not a referenced modelDef,
  // not a primitive. The field will be dropped from the generated schema —
  // surface a warning so this doesn't silently break production (e.g. admin
  // edits via the affected model get discarded by Mongoose strict mode).
  // Most common cause: an enum was added to a source project but never
  // added to the corresponding enumInfos.ts registry.
  const ownerModel = nestedModelNames[nestedModelNames.length - 1] || 'unknown';
  console.warn(
    `bg-code-gen mongooseSchemaTask: unrecognized dataType "${propDef.dataType}" ` +
    `on attribute "${ownerModel}.${propDef.name}". ` +
    `Field will be omitted from the generated schema. ` +
    `If "${dataType}" is an enum, add it to enumInfos.ts. ` +
    `If it is a modelDef, ensure it is registered with the task.`
  );
  return '';
}

export default convertPropDefToProperty
