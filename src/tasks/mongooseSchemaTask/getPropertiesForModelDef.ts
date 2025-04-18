import { BgModelDef, JsonSchemaTask } from '../../types.js'
import getPropertyDefsForModelDef from './getPropertyDefsForModelDef.js'
import convertPropDefToProperty from './convertPropDefToProperty.js'

const getPropertiesForModelDef = (
  modelDef: BgModelDef,
  nestedModelNames: string[],
  level: number,
  task: JsonSchemaTask,
): string[] => {
  const nestedMatchingNames = nestedModelNames.filter(name => name === modelDef.name)
  if (nestedMatchingNames.length > 1) {
    return [];
  }
  nestedModelNames.push(modelDef.name);

  const propDefs = getPropertyDefsForModelDef(modelDef, task);

  if (!Array.isArray(propDefs) || propDefs.length < 1) {
    return [];
  }

  const properties: string[] = [];
  for (const attr of propDefs.filter(d => !d.schema?.skip)) {
    const prop = convertPropDefToProperty(attr, nestedModelNames, level, task);
    if (prop) {
      properties.push(prop);
    }
  }

  return properties;
}

export default getPropertiesForModelDef
