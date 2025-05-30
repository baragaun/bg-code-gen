import { BgModelDef, JsonSchemaTask } from '../../types.js'
import getPropertyDefsForModelDef from './getPropertyDefsForModelDef.js'
import convertPropDefToProperty from './convertPropDefToProperty.js'

const getPropertiesForModelDef = (
  modelDef: BgModelDef,
  nestedModelNames: string[],
  task: JsonSchemaTask,
): any | null => {
  const nestedMatchingNames = nestedModelNames.filter(name => name === modelDef.name)
  if (nestedMatchingNames.length > 1) {
    return null;
  }
  nestedModelNames.push(modelDef.name);

  const propDefs = getPropertyDefsForModelDef(modelDef, task);

  if (!Array.isArray(propDefs) || propDefs.length < 1) {
    return null;
  }

  const properties: any = {};
  for (const attr of propDefs.filter(d => !d.schema?.skip)) {
    const prop = convertPropDefToProperty(attr, nestedModelNames, task);
    if (prop) {
      const { name } = prop;
      delete prop.name;
      properties[name] = prop;
    }
  }

  return properties;
}

export default getPropertiesForModelDef
