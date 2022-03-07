import { NotificationCategory } from '../../core/entities/Notification'

export type ProfileModalNavigatorParamList = {
  Profile: undefined
  PersonalInformation: undefined
  CenterOfInterest: undefined
  NotificationMenu: undefined
  Notifications: { category: NotificationCategory }
}
