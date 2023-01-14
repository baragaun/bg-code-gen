import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const asyncTask: TypeGraphqlClass = {
  name: 'AsyncTask',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/tasks/types/classes/AsyncTask.ts',
  dbCollectionName: 'async-tasks',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id' },
    { name: 'userIdent', dataType: 'string' },
    { name: 'username', dataType: 'string' },
    { name: 'email', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'taskType', dataType: 'AsyncTaskType', default: 'AsyncTaskType.UNSET' },
    { name: 'taskStatus', dataType: 'AsyncTaskStatus', default: 'AsyncTaskStatus.CREATED' },
    { name: 'notificationMethod', dataType: 'Messaging.NotificationMethod', default: 'Messaging.NotificationMethod.AUTO' },
    { name: 'result', dataType: 'AsyncTaskResult', default: 'AsyncTaskResult.UNSET' },
    { name: 'confirmToken', dataType: 'string' },
    { name: 'attemptCount', dataType: 'integer', default: '0' },
    { name: 'notificationSentAt', dataType: 'date', optional: true },
    { name: 'notificationResult', dataType: 'string' },
    { name: 'notificationId', dataType: 'string' },
    { name: 'textData', dataType: 'string' },
    { name: 'report', dataType: 'string' },
  ]
}

export default asyncTask
