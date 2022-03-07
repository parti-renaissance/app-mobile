import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from '../assets/localizables/fr.json'
import { defaultLanguage } from './defaultLanguage'

i18n.use(initReactI18next).init({
  lng: defaultLanguage.languageTag,
  resources: {
    fr: { translation: fr.fr },
  },
  keySeparator: '.',
  fallbackLng: false,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
