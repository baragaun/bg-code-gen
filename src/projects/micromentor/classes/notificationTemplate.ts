import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const NotificationTemplate: TypeGraphqlClass = {
  name: 'NotificationTemplate',
  graphqlType: GraphqlType.ObjectType,
  extends: 'BaseModel',
  path: 'src/services/messaging/types/classes/NotificationTemplate.ts',
  dbCollectionName: 'Notification-templates',
  active: true,
  attributes: [
    { name: 'name', dataType: 'CoreNotificationTemplateName', default: 'CoreNotificationTemplateName.NOT_SET' },
    { name: 'description', dataType: 'string' },
    { name: 'titleEn', dataType: 'string' },
    { name: 'messageTextEn', dataType: 'string' },
    { name: 'shortMessageTextEn', dataType: 'string' },
    { name: 'htmlMessageEn', dataType: 'string' },
    { name: 'action0', dataType: 'AppAction', optional: true },
    { name: 'action1', dataType: 'AppAction', optional: true },
    { name: 'action2', dataType: 'AppAction', optional: true },
    { name: 'sendEmail', dataType: 'boolean', default: 'false' },
    { name: 'sendInAppMessage', dataType: 'boolean', default: 'false' },
    { name: 'sendPushNotification', dataType: 'boolean', default: 'false' },
    { name: 'sendSms', dataType: 'boolean', default: 'false' },
    { name: 'isCore', dataType: 'boolean', default: 'false' },
  ]
}

export default NotificationTemplate
