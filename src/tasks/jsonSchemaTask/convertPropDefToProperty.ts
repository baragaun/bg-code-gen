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
  }

  if (propDef.optional) {
    prop.nullable = true;
  }

  return prop;
}

export default convertPropDefToProperty
