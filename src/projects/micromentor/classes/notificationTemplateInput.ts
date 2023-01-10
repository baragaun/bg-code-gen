import { TypeGraphqlClass } from '../../../types.js'
import { GraphqlType } from '../../../enums.js'

const NotificationTemplateInput: TypeGraphqlClass = {
  name: 'NotificationTemplateInput',
  graphqlType: GraphqlType.InputType,
  extends: 'BaseModelInput',
  path: 'src/services/messaging/types/classes/NotificationTemplateInput.ts',
  active: true,
  attributes: [
    { name: 'templateId', dataType: 'id' },
    { name: 'name', dataType: 'CoreNotificationTemplateName' },
    { name: 'description', dataType: 'string' },
    { name: 'titleEn', dataType: 'string' },
    { name: 'messageTextEn', dataType: 'string' },
    { name: 'shortMessageTextEn', dataType: 'string' },
    { name: 'htmlMessageEn', dataType: 'string' },
    { name: 'action0', dataType: 'AppAction' },
    { name: 'action1', dataType: 'AppAction' },
    { name: 'action2', dataType: 'AppAction' },
    { name: 'sendEmail', dataType: 'boolean' },
    { name: 'sendInAppMessage', dataType: 'boolean' },
    { name: 'sendPushNotification', dataType: 'boolean' },
    { name: 'sendSms', dataType: 'boolean' },
    { name: 'isCore', dataType: 'boolean' },
  ]
}

export default NotificationTemplateInput
