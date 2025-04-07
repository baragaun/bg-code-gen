import { BgModelDef, JsonSchemaTask, TypeGraphqlAttr } from '../../types.js'

const getPropertyDefsForModelDef = (
  modelDef: BgModelDef,
  task: JsonSchemaTask,
): TypeGraphqlAttr[] => {
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

  let attributes: TypeGraphqlAttr[] = [];
  for (const parentModel of parentModels) {
    for (const parentProp of parentModel.attributes) {
      const indexOfExistingProp = attributes.findIndex(attr => attr.name === parentProp.name);
      if (indexOfExistingProp > -1) {
        attributes[indexOfExistingProp] = parentProp;
      } else {
        attributes.push(parentProp);
      }
    }
  }

  for (const prop of modelDef.attributes) {
    const indexOfExistingProp = attributes.findIndex(attr => attr.name === prop.name);
    if (indexOfExistingProp > -1) {
      attributes[indexOfExistingProp] = prop;
    } else {
      attributes.push(prop);
    }
  }

  return attributes;
}

export default getPropertyDefsForModelDef
