import PushNotification from 'react-native-push-notification'

export interface LocalNotification {
  title?: string
  body: string
}

export const LocalNotificationCenter = {
  post: (notification: LocalNotification) => {
    if (notification.body.length === 0) {
      return
    }
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body,
      largeIcon: '',
      smallIcon: 'ic_notification',
    })
  },
}
