import { JsonSchemaTask, TypeGraphqlAttr } from '../../types.js'
import getPropertiesForModelDef from './getPropertiesForModelDef.js'

const convertPropDefToProperty = (
  propDef: TypeGraphqlAttr,
  task: JsonSchemaTask,
): any | null => {
  const prop: any = {};

  if (propDef.schema?.skip) {
    return null;
  }

  if (propDef.description) {
    prop.description = propDef.description;
  }

  if (propDef.schema) {
    if (propDef.schema.type === 'object') {
      prop.type = 'object';

      if (propDef.schema.modelType) {
        const modelDef = task.models
          .find(m => m.name === propDef.schema?.modelType);
        if (modelDef) {
          prop.properties = getPropertiesForModelDef(modelDef, task);
        }
      }

      return prop;
    }

    if (propDef.schema.type === 'array' && propDef.schema.arrayItemType === 'object') {
      prop.type = 'array';
      prop.items = {
        type: 'object',
      };
      const itemModelDef = task.models
        .find(m => m.name === propDef.schema?.arrayItemObject || m.name === propDef.dataType);

      if (itemModelDef) {
        prop.items.properties = getPropertiesForModelDef(itemModelDef, task);
      }

      return prop;
    }
  }

  if (
    propDef.dataType.toLowerCase() === 'string' ||
    propDef.dataType.toLowerCase() === 'id'
  ) {
    prop.type = 'string';

    let maxLength = propDef.maxLength
    if (!maxLength && propDef.dataType.toLowerCase() === 'id') {
      // ee3b6cab23204e79a203f9504128c748
      maxLength = 32;
    }

    if (maxLength) {
      prop.maxLength = maxLength;
    }

    return prop;
  }

  if (
    propDef.dataType.toLowerCase() === 'string[]' ||
    propDef.dataType.toLowerCase() === 'id[]'
  ) {
    prop.type = 'array';
    prop.items = {
      type: 'string',
    };

    let maxLength = propDef.maxLength
    if (!maxLength && propDef.dataType.toLowerCase() === 'id[]') {
      // ee3b6cab23204e79a203f9504128c748
      maxLength = 32;
    }

    if (maxLength) {
      prop.items.maxLength = maxLength;
    }

    return prop;
  }

  if (propDef.dataType.toLowerCase() === 'boolean') {
    prop.type = 'boolean';

    return prop;
  }

  if (propDef.dataType.toLowerCase() === 'integer') {
    prop.type = 'integer';

    return prop;
  }

  if (propDef.dataType.toLowerCase() === 'float' || propDef.dataType.toLowerCase() === 'integer') {
    prop.type = 'number';

    return prop;
  }

  if (propDef.dataType.toLowerCase() === 'date') {
    prop.type = 'string';
    prop.format = 'date-time';

    return prop;
  }

  return prop;
}

export default convertPropDefToProperty
