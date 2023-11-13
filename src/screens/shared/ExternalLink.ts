import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Analytics } from "../../utils/Analytics";

export const ExternalLink = {
  openUrl: async (url: string) => {
    InAppBrowser.open(url);
    await Analytics.logUrlOpened(url);
  },
};
