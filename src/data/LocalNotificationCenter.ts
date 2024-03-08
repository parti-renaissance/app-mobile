export interface LocalNotification {
  title?: string
  body: string
  deeplinkUrl?: string
}

export const LocalNotificationCenter = {
  post: (_: LocalNotification) => {},
  observeDeeplinkUrl: (_: (url: string) => void): (() => void) => {
    return
  },
}
