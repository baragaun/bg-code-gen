import {
  BgCodeGenProject,
  BgModelDef,
  BgModelDefTaskConfig,
  MongooseSchemaTask
} from '../../types.js'
import getAllPropertyDefsForModelDef from '../helpers/getAllPropertyDefsForModelDef.js'
import convertPropDefToProperty from './convertPropDefToProperty.js'

const getPropertiesForModelDef = (
  modelDef: BgModelDef,
  nestedModelNames: string[],
  level: number,
  task: MongooseSchemaTask,
  modelDefTaskConfig: BgModelDefTaskConfig,
  project: BgCodeGenProject,
): string[] => {
  const nestedMatchingNames = nestedModelNames.filter(name => name === modelDef.name)
  if (nestedMatchingNames.length > 1) {
    return [];
  }
  nestedModelNames.push(modelDef.name);

  let propDefs = getAllPropertyDefsForModelDef(
    modelDef,
    task,
    modelDefTaskConfig,
    project,
  ).filter(d => !d.schema?.skip);

  if (!Array.isArray(propDefs) || propDefs.length < 1) {
    return [];
  }

  if (Array.isArray(modelDefTaskConfig.removeProps) && modelDefTaskConfig.removeProps.length > 0) {
    propDefs = propDefs.filter(p => !modelDefTaskConfig.removeProps!.includes(p.name));
  }

  const props: string[] = [];
  for (const propDef of propDefs) {
    const prop = convertPropDefToProperty(
      propDef,
      nestedModelNames,
      level,
      task,
      modelDefTaskConfig,
      project,
    );
    if (prop) {
      props.push(prop);
    }
  }

  return props;
}

export default getPropertiesForModelDef
