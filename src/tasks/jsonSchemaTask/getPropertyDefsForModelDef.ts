import { TypeGraphqlClass, JsonSchemaTask, TypeGraphqlAttr } from '../../types.js'

const getPropertyDefsForModelDef = (
  modelDef: TypeGraphqlClass,
  task: JsonSchemaTask,
): TypeGraphqlAttr[] => {
  if (!modelDef.extends) {
    return modelDef.attributes;
  }

  let curModelDef: TypeGraphqlClass | undefined = modelDef;
  let parentModels: TypeGraphqlClass[] = [];

  while (curModelDef?.extends) {
    const parentModel = task.models
      .find(model => model.name === curModelDef?.extends);

    if (parentModel) {
      parentModels.push(parentModel);
    }

    curModelDef = parentModel;
  }

  parentModels.reverse();

  let attributes: TypeGraphqlAttr[] = [];
  for (const parentModel of parentModels) {
    attributes = attributes.concat(parentModel.attributes);
  }

  return attributes.concat(modelDef.attributes);
}

export default getPropertyDefsForModelDef
