import {
  BgCodeGenProject,
  BgModelDefTaskConfig,
  JsonSchemaTask,
  ModelPropDef
} from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js'

const convertPropDefToProperty = (
  propDef: ModelPropDef,
  nestedModelNames: string[],
  task: JsonSchemaTask,
  modelDefTaskConfig: BgModelDefTaskConfig,
  project: BgCodeGenProject,
): any | null => {
  if (propDef.schema?.skip) {
    return null;
  }

  const prop: any = {
    name: propDef.name,
    type: propDef.schema?.type || propDef.dataType,
  };

  if (propDef.description) {
    prop.description = propDef.description;
  }

  const isArray = propDef.dataType.endsWith('[]');
  const dataType = isArray
    ? propDef.dataType.substring(0, propDef.dataType.length - 2)
    : propDef.dataType;
  if (isArray) {
    prop.type = 'array';
  }

  if (Array.isArray(task.enumInfos) && task.enumInfos.length > 0) {
    const enumInfo = task.enumInfos.find(e => e.name === dataType);

    if (enumInfo) {
      if (isArray) {
        prop.items = {
          // type: propDef.optional
          //   ? `['string', 'null']` :
          //   'string',
          type: 'string',
          enum: propDef.optional ? enumInfo.values.concat([null]) : enumInfo.values,
          // Adding `enumType` breaks RxDB:
          // enumType: enumInfo.name,
        };
      } else {
        prop.type = 'string';
        prop.enum = propDef.optional ? enumInfo.values.concat([null]) : enumInfo.values;
        // Adding `enumType` breaks RxDB:
        // prop.enumType = enumInfo.name;
      }
    }
  }

  const referencedModelDef = task.modelDefs
    .find(m => m.name === dataType);

  if (referencedModelDef) {
    const properties = getPropertiesForModelDef(
      referencedModelDef,
      nestedModelNames,
      task,
      modelDefTaskConfig,
      project,
    );

    prop.type = isArray ? 'array' : 'object';
    if (isArray) {
      prop.items = {
        type: 'object',
        properties,
      };
    } else {
      prop.properties = properties;
    }
    if (prop.properties === null) {
      return null;
    }
  } else if (
    dataType.toLowerCase() === 'string' ||
    dataType.toLowerCase() === 'id'
  ) {
    if (isArray) {
      prop.items = {
        type: 'string',
      };
    } else {
      prop.type = 'string';
    }

    let maxLength = propDef.maxLength
    if (!maxLength && dataType.toLowerCase() === 'id') {
      // ee3b6cab23204e79a203f9504128c748
      maxLength = 32;
    }

    if (maxLength) {
      if (isArray) {
        prop.items.maxLength = maxLength;
      } else {
        prop.maxLength = maxLength;
      }
    }
  } else if (dataType.toLowerCase() === 'boolean') {
    if (isArray) {
      prop.items = {
        type: 'boolean',
      };
    } else {
      prop.type = 'boolean';
    }
  } else if (dataType.toLowerCase() === 'date') {
    if (isArray) {
      prop.items = {
        type: 'string',
        format: 'string',
      };
    } else {
      prop.type = 'string';
      prop.format = 'date-time';
    }
  } else if (dataType.toLowerCase() === 'float') {
    if (isArray) {
      prop.items = {
        type: 'number',
      };
    } else {
      prop.type = 'number';
    }
  } else if (
    dataType.toLowerCase() === 'integer' ||
    dataType.toLowerCase() === 'long'
  ) {
    if (isArray) {
      prop.items = {
        type: 'integer',
      };
    } else {
      prop.type = 'integer';
    }
  } else if (
    dataType.toLowerCase() === 'json' ||
    dataType.toLowerCase() === 'object'
  ) {
    if (isArray) {
      prop.items = {
        type: 'object',
      };
    } else {
      prop.type = 'object';
    }
  } else {
    // Unrecognized dataType: not a registered enum, not a referenced modelDef,
    // not a primitive. The prop will still be returned but with `type` set to
    // the raw dataType string, which is not a valid JSON Schema type. Surface
    // a warning so this doesn't silently produce a malformed schema.
    // Most common cause: an enum was added to a source project but never
    // added to the corresponding enumInfos.ts registry.
    const ownerModel = nestedModelNames[nestedModelNames.length - 1] || 'unknown';
    console.warn(
      `bg-code-gen jsonSchemaTask: unrecognized dataType "${propDef.dataType}" ` +
      `on attribute "${ownerModel}.${propDef.name}". ` +
      `Emitted prop will have an invalid JSON Schema type. ` +
      `If "${dataType}" is an enum, add it to enumInfos.ts. ` +
      `If it is a modelDef, ensure it is registered with the task.`
    );
  }

  if (propDef.optional) {
    prop.nullable = true;
  }

  return prop;
}

export default convertPropDefToProperty
