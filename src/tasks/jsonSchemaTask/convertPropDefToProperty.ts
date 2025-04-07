import { JsonSchemaTask, TypeGraphqlAttr } from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js'

const convertPropDefToProperty = (
  propDef: TypeGraphqlAttr,
  nestedModelNames: string[],
  task: JsonSchemaTask,
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
      prop.type = 'string';
      prop.enum = enumInfo.values;
      prop.enumType = enumInfo.name;
    }
  }

  const referencedModelDef = task.modelDefs
    .find(m => m.name === dataType);

  if (referencedModelDef) {
    prop.type = isArray ? 'array' : 'object';
    if (isArray) {
      prop.items = {
        type: 'object',
      };
    }
    prop.properties = getPropertiesForModelDef(referencedModelDef, nestedModelNames, task);
    if (prop.properties === null) {
      return null;
    }
  }

  if (
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
      prop.maxLength = maxLength;
    }

    return prop;
  }

  if (dataType.toLowerCase() === 'boolean') {
    if (isArray) {
      prop.items = {
        type: 'boolean',
      };
    } else {
      prop.type = 'boolean';
    }

    return prop;
  }

  if (dataType.toLowerCase() === 'date') {
    if (isArray) {
      prop.items = {
        type: 'string',
        format: 'string',
      };
    } else {
      prop.type = 'string';
      prop.format = 'date-time';
    }

    return prop;
  }

  if (dataType.toLowerCase() === 'float') {
    if (isArray) {
      prop.items = {
        type: 'number',
      };
    } else {
      prop.type = 'number';
    }

    return prop;
  }

  if (
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

    return prop;
  }

  if (
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

    return prop;
  }

  return prop;
}

export default convertPropDefToProperty
