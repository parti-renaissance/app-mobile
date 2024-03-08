import * as deviceInfoModule from 'expo-device'
import i18n from '../../utils/i18n'

export const versionLabel = i18n.t('profile.version', {
  version: deviceInfoModule.osVersion
})
