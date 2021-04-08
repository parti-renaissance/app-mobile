import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'
import { NotificationsScreenProps } from '../../../navigation'
import i18n from '../../../utils/i18n'

export type NotificationCategory = 'local' | 'national'

const NotificationsScreen = (props: NotificationsScreenProps) => {
  props.navigation.setOptions({
    title: getTitle(props.route.params.category),
  })
  return <SafeAreaView />
}

function getTitle(category: NotificationCategory): string {
  switch (category) {
    case 'local':
      return i18n.t('notificationmenu.local')
    case 'national':
      return i18n.t('notificationmenu.national')
  }
}

export default NotificationsScreen
