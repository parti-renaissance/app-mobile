import * as WebBrowser from 'expo-web-browser';
import { Analytics } from '../../utils/Analytics'

export const ExternalLink = {
  openUrl: async (url: string) => {
    await WebBrowser.openBrowserAsync(url)
    await Analytics.logUrlOpened(url)
  },
}
