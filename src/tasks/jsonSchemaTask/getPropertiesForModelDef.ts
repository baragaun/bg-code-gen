import { BgCodeGenProject, BgModelDef, BgModelDefTaskConfig, JsonSchemaTask } from '../../types.js'
import convertPropDefToProperty from './convertPropDefToProperty.js'
import getAllPropertyDefsForModelDef from '../helpers/getAllPropertyDefsForModelDef.js'

const getPropertiesForModelDef = (
  modelDef: BgModelDef,
  nestedModelNames: string[],
  task: JsonSchemaTask,
  modelDefTaskConfig: BgModelDefTaskConfig,
  project: BgCodeGenProject,
): any | null => {
  const nestedMatchingNames = nestedModelNames.filter(name => name === modelDef.name)
  if (nestedMatchingNames.length > 1) {
    return null;
  }
  nestedModelNames.push(modelDef.name);

  let propDefs = getAllPropertyDefsForModelDef(
    modelDef,
    task,
    modelDefTaskConfig,
    project,
  ).filter(d => !d.schema?.skip);

  if (Array.isArray(modelDefTaskConfig.removeProps) && modelDefTaskConfig.removeProps.length > 0) {
    propDefs = propDefs.filter(p => !modelDefTaskConfig.removeProps!.includes(p.name));
  }

  if (!Array.isArray(propDefs) || propDefs.length < 1) {
    return null;
  }

  const props: any = {};
  for (const attr of propDefs) {
    const prop = convertPropDefToProperty(
      attr,
      nestedModelNames,
      task,
      modelDefTaskConfig,
      project,
    );
    if (prop) {
      const { name } = prop;
      delete prop.name;
      props[name] = prop;
    }
  }

  return props;
}

export default getPropertiesForModelDef
