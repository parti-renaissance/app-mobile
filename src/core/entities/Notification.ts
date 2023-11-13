export type NotificationCategory = "local" | "national";
export type NotificationMedia = "sms" | "email";

export interface Notification {
  id: string;
  label: string;
  category: NotificationCategory;
  media: NotificationMedia;
}
