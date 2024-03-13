import Constants from "expo-constants"
import i18n from '../../utils/i18n'

export const versionLabel = i18n.t('profile.version', {
  version: Constants.manifest2.runtimeVersion,
})
