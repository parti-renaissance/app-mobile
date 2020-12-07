import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

const fallbackLanguage = { languageTag: 'fr', isRTL: false }
const defaultLanguage =
  RNLocalize.findBestAvailableLanguage(['fr']) || fallbackLanguage

import fr from '../assets/localizables/fr.json'

i18n.use(initReactI18next).init({
  lng: defaultLanguage.languageTag,
  resources: {
    fr: { translation: fr.fr },
  },
  keySeparator: '.',
  fallbackLng: false,
  debug: true,
})

export default i18n
