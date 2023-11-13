import { MultiMap } from "mnemonist";
import {
  Notification,
  NotificationCategory,
  NotificationMedia,
} from "../../../core/entities/Notification";
import i18n from "../../../utils/i18n";
import {
  ID_PUSH,
  NotificationRowViewModel,
  NotificationSectionViewModel,
  NotificationsViewModel,
} from "./NotificationViewModel";

export const NotificationViewModelMapper = {
  map: (
    notificationCategory: NotificationCategory,
    isPushEnabled: boolean,
    notifications: Array<Notification>,
    notificationsEnabled: Array<string>,
  ): NotificationsViewModel => {
    const notificationLabel = getNotificationLabel(notificationCategory);
    const sections: Array<NotificationSectionViewModel> = [];
    const sectionPush: NotificationSectionViewModel = {
      title: i18n.t("notificationsubmenu.section_push"),
      data: [
        {
          id: ID_PUSH,
          label: notificationLabel,
          isSelected: isPushEnabled,
          isLastOfSection: true,
        },
      ],
    };
    sections.push(sectionPush);
    const multiMap = new MultiMap<string, Notification>();

    notifications.forEach((notification) => {
      multiMap.set(notification.media, notification);
    });

    insertSections(sections, notificationsEnabled, multiMap, "email");
    insertSections(sections, notificationsEnabled, multiMap, "sms");

    return {
      sections: sections,
    };
  },
};

function getNotificationLabel(notificationCategory: NotificationCategory) {
  switch (notificationCategory) {
    case "local":
      return i18n.t("notificationsubmenu.push_description_local");
    case "national":
      return i18n.t("notificationsubmenu.push_description_national");
  }
}
function mapNotification(
  notification: Notification,
  notificationsEnabled: Array<string>,
  isLastOfSection: boolean,
): NotificationRowViewModel {
  return {
    id: notification.id,
    label: notification.label,
    isSelected: notificationsEnabled.includes(notification.id),
    isLastOfSection: isLastOfSection,
  };
}

function insertSections(
  sections: NotificationSectionViewModel[],
  notificationsEnabled: Array<string>,
  multiMap: MultiMap<string, Notification, Notification[]>,
  media: NotificationMedia,
) {
  const notifications = multiMap.get(media);
  if (notifications) {
    const viewModels = notifications.map((notification, index) => {
      return mapNotification(
        notification,
        notificationsEnabled,
        index === notifications.length - 1,
      );
    });
    sections.push({ title: mapSectionLabel(media), data: viewModels });
  }
}

function mapSectionLabel(media: NotificationMedia): string {
  switch (media) {
    case "email":
      return i18n.t("notificationsubmenu.section_emails");
    case "sms":
      return i18n.t("notificationsubmenu.section_sms");
  }
}
