import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const asyncTaskInput: TypeGraphqlClass = {
  name: 'AsyncTaskInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/tasks/types/classes/AsyncTaskInput.ts',
  active: true,
  attributes: [
    { name: 'userId', dataType: 'id', default: '\'\'', optional: false },
    { name: 'userIdent', dataType: 'string' },
    { name: 'username', dataType: 'string' },
    { name: 'email', dataType: 'string' },
    { name: 'phoneNumber', dataType: 'string' },
    { name: 'deviceUuid', dataType: 'string' },
    { name: 'taskType', dataType: 'AsyncTaskType' },
    { name: 'taskStatus', dataType: 'AsyncTaskStatus' },
    { name: 'notificationMethod', dataType: 'Messaging.NotificationMethod' },
    { name: 'result', dataType: 'AsyncTaskResult' },
    { name: 'confirmToken', dataType: 'string' },
    { name: 'attemptCount', dataType: 'integer' },
    { name: 'notificationSentAt', dataType: 'date' },
    { name: 'notificationResult', dataType: 'string' },
    { name: 'notificationId', dataType: 'string' },
    { name: 'textData', dataType: 'string' },
    { name: 'report', dataType: 'string' },
  ]
}

export default asyncTaskInput
