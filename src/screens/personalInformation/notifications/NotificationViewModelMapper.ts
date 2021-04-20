import { MultiMap } from 'mnemonist'
import {
  NotificationCategory,
  NotificationMedia,
} from '../../../core/entities/Notification'
import i18n from '../../../utils/i18n'
import {
  NotificationRowViewModel,
  NotificationSectionViewModel,
  NotificationsViewModel,
} from './NotificationViewModel'
import { Notification } from '../../../core/entities/Notification'

export const NotificationViewModelMapper = {
  map: (
    notificationCategory: NotificationCategory,
    isPushEnabled: boolean,
    notifications: Array<Notification>,
    notificationsEnabled: Array<string>,
  ): NotificationsViewModel => {
    const notificationLabel = getNotificationLabel(notificationCategory)
    const sections: Array<NotificationSectionViewModel> = []
    const sectionPush: NotificationSectionViewModel = {
      title: i18n.t('notificationsubmenu.section_push'),
      data: [
        {
          id: ID_PUSH,
          label: notificationLabel,
          isSelected: isPushEnabled,
        },
      ],
    }
    sections.push(sectionPush)
    const multiMap = new MultiMap<string, NotificationRowViewModel>()

    notifications.forEach((notification) => {
      const notificationViewModel = mapNotification(
        notification,
        notificationsEnabled,
      )
      multiMap.set(notification.media, notificationViewModel)
    })

    insertSections(sections, multiMap, 'email')
    insertSections(sections, multiMap, 'sms')

    return {
      sections: sections,
    }
  },
}

const ID_PUSH = '__push'
function getNotificationLabel(notificationCategory: NotificationCategory) {
  switch (notificationCategory) {
    case 'local':
      return i18n.t('notificationsubmenu.push_description_local')
    case 'national':
      return i18n.t('notificationsubmenu.push_description_national')
  }
}
function mapNotification(
  notification: Notification,
  notificationsEnabled: Array<string>,
): NotificationRowViewModel {
  return {
    id: notification.id,
    label: notification.label,
    isSelected: notificationsEnabled.includes(notification.id),
  }
}

function insertSections(
  sections: NotificationSectionViewModel[],
  multiMap: MultiMap<
    string,
    NotificationRowViewModel,
    NotificationRowViewModel[]
  >,
  media: NotificationMedia,
) {
  const viewModels = multiMap.get(media)
  if (viewModels) {
    sections.push({ title: mapSectionLabel(media), data: viewModels })
  }
}

function mapSectionLabel(media: NotificationMedia): string {
  switch (media) {
    case 'email':
      return i18n.t('notificationsubmenu.section_emails')
    case 'sms':
      return i18n.t('notificationsubmenu.section_sms')
  }
}
