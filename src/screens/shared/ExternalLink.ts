import { CustomTabs } from 'react-native-custom-tabs'
import { Analytics } from '../../utils/Analytics'

export const ExternalLink = {
  openUrl: async (url: string) => {
    CustomTabs.openURL(url)
    await Analytics.logUrlOpened(url)
  },
}
