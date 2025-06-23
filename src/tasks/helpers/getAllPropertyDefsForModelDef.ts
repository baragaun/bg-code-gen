import {
  BgCodeGenProject,
  BgCodeGenTask,
  BgModelDef,
  BgModelDefTaskConfig,
  ModelPropDef
} from '../../types.js'
import { haveCommonTags } from './haveCommonTags.js'

const getAllPropertyDefsForModelDef = (
  modelDef: BgModelDef,
  task: BgCodeGenTask,
  modelDefTaskConfig: BgModelDefTaskConfig | null | undefined,
  project: BgCodeGenProject,
): ModelPropDef[] => {
  if (!modelDef.extends) {
    return modelDef.attributes;
  }

  let curModelDef: BgModelDef | undefined = modelDef;
  let parentModels: BgModelDef[] = [];

  while (curModelDef?.extends) {
    const parentModelDef = task.modelDefs
      .find(model => model.name === curModelDef?.extends);

    if (parentModelDef) {
      parentModels.push(parentModelDef);
    }

    curModelDef = parentModelDef;
  }

  if (parentModels.length < 1) {
    return modelDef.attributes;
  }

  parentModels.reverse();

  const tags = (project.tags || []).concat(modelDefTaskConfig?.tags || []);
  let props: ModelPropDef[] = [];
  for (const parentModel of parentModels) {
    for (const parentProp of parentModel.attributes) {
      const indexOfExistingProp = props.findIndex(attr => attr.name === parentProp.name);
      if (indexOfExistingProp > -1) {
        props[indexOfExistingProp] = parentProp;
      } else if (haveCommonTags(tags, parentProp.tags)) {
        props.push(parentProp);
      }
    }
  }

  for (const prop of modelDef.attributes) {
    const indexOfExistingProp = props.findIndex(attr => attr.name === prop.name);
    if (indexOfExistingProp > -1) {
      props[indexOfExistingProp] = prop;
    } else if (haveCommonTags(tags, prop.tags)) {
      props.push(prop);
    }
  }

  return props;
}

export default getAllPropertyDefsForModelDef
