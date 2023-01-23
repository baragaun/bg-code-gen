import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const notification: TypeGraphqlClass = {
  name: 'NotificationInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/messaging/types/classes/NotificationInput.ts',
  active: true,
  attributes: [
    { name: 'templateId', dataType: 'id' },
    { name: 'templateName', dataType: 'id' },
    { name: 'toUserId', dataType: 'id' },
    { name: 'asyncTaskId', dataType: 'id' },
    { name: 'initiatorId', dataType: 'id' },
    { name: 'replyingToId', dataType: 'id' },
    { name: 'title', dataType: 'string' },
    { name: 'messageText', dataType: 'string' },
    { name: 'shortMessageText', dataType: 'string' },
    { name: 'htmlMessage', dataType: 'string' },
    { name: 'appLink', dataType: 'string' },
    { name: 'action0', dataType: 'AppAction' },
    { name: 'action1', dataType: 'AppAction' },
    { name: 'action2', dataType: 'AppAction' },
    { name: 'actionTaken', dataType: 'AppAction' },
    { name: 'sendEmail', dataType: 'boolean' },
    { name: 'sendInAppMessage', dataType: 'boolean' },
    { name: 'sendPushNotification', dataType: 'boolean' },
    { name: 'sendSms', dataType: 'boolean' },
    { name: 'emailSentAt', dataType: 'date' },
    { name: 'inAppMessageSentAt', dataType: 'date' },
    { name: 'inAppMessageReceivedAt', dataType: 'date' },
    { name: 'pushNotificationSentAt', dataType: 'date' },
    { name: 'smsSentAt', dataType: 'date' },
    { name: 'emailSendReport', dataType: 'string' },
    { name: 'pushNotificationSendReport', dataType: 'string' },
    { name: 'smsSendReport', dataType: 'string' },
    { name: 'sentMessagesCount', dataType: 'integer' },
    { name: 'recipientInfo', dataType: 'NonMemberInfo' },
  ]
}

export default notification
