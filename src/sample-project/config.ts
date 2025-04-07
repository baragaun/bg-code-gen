import { BgCodeGenProject, TypeGraphqlTask } from '../types.js';
import { TaskType } from '../enums.js';
import animal from './classes/animal.js';

const typeGraphqlTask: TypeGraphqlTask = {
  taskType: TaskType.typeGraphql,
  enabled: true,
  modelDefs: [animal],
}

const config: BgCodeGenProject = {
  sourceProjects: [
    {
      name: 'sample',
      rootPath: './sample-project',
      // jsonSchemaPath: './sample-project/models/schema',
    },
  ],
  tasks: [
    typeGraphqlTask,
  ],
};

export default config
