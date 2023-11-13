import deviceInfoModule from "react-native-device-info";
import i18n from "../../utils/i18n";

export const versionLabel = i18n.t("profile.version", {
  version: deviceInfoModule.getVersion(),
});
