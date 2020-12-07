import analytics from '@react-native-firebase/analytics'

export const Analytics = {
  logScreen: async (screenName: string) => {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    })
  },
  logUrlOpened: async (url: string) => {
    await analytics().logEvent('external_link_opened', { url: url })
  },
}
