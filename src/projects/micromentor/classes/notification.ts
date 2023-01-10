import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const notification: TypeGraphqlClass = {
  name: 'Notification',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/messaging/types/classes/Notification.ts',
  dbCollectionName: 'notifications',
  active: true,
  attributes: [
    { name: 'templateId', dataType: 'id' },
    { name: 'toUserId', dataType: 'id' },
    { name: 'asyncTaskId', dataType: 'id' },
    { name: 'initiatorId', dataType: 'id' },
    { name: 'replyingToId', dataType: 'id' },
    { name: 'title', dataType: 'string' },
    { name: 'messageText', dataType: 'string' },
    { name: 'shortMessageText', dataType: 'string' },
    { name: 'htmlMessage', dataType: 'string' },
    { name: 'appLink', dataType: 'string' },
    { name: 'action0', dataType: 'AppAction', optional: true },
    { name: 'action1', dataType: 'AppAction', optional: true },
    { name: 'action2', dataType: 'AppAction', optional: true },
    { name: 'actionTaken', dataType: 'AppAction', optional: true },
    { name: 'sendEmail', dataType: 'boolean', default: 'false' },
    { name: 'sendInAppMessage', dataType: 'boolean', default: 'false' },
    { name: 'sendPushNotification', dataType: 'boolean', default: 'false' },
    { name: 'sendSms', dataType: 'boolean', default: 'false' },
    { name: 'emailSentAt', dataType: 'date', optional: true },
    { name: 'inAppMessageSentAt', dataType: 'date', optional: true },
    { name: 'inAppMessageReceivedAt', dataType: 'date', optional: true },
    { name: 'pushNotificationSentAt', dataType: 'date', optional: true },
    { name: 'smsSentAt', dataType: 'date', optional: true },
    { name: 'emailSendReport', dataType: 'string' },
    { name: 'pushNotificationSendReport', dataType: 'string' },
    { name: 'smsSendReport', dataType: 'string' },
    { name: 'sentMessagesCount', dataType: 'integer', default: '0' },
    { name: 'recipientInfo', dataType: 'NonMemberInfo', optional: true },
  ]
}

export default notification
