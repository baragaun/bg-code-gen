import { TypeGraphqlClass, JsonSchemaTask } from '../../types.js'
import getPropertyDefsForModelDef from './getPropertyDefsForModelDef.js'
import convertPropDefToProperty from './convertPropDefToProperty.js'

const getPropertiesForModelDef = (
  modelDef: TypeGraphqlClass,
  task: JsonSchemaTask,
): any | null => {
  const propDefs = getPropertyDefsForModelDef(modelDef, task);

  if (!Array.isArray(propDefs) || propDefs.length < 1) {
    return null;
  }

  const properties: any = {};
  for (const attr of propDefs.filter(d => !d.schema?.skip)) {
    const prop = convertPropDefToProperty(attr, task);
    if (prop) {
      properties[attr.name] = prop;
    }
  }

  return properties;
}

export default getPropertiesForModelDef
