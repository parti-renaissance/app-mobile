import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from '../assets/localizables/fr.json'
import { defaultLanguage } from './defaultLanguage'
import 'intl-pluralrules'
import { format as _format } from 'date-fns'
import { fr as _fr } from 'date-fns/locale'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: defaultLanguage.languageTag,
  resources: {
    fr: { translation: fr.fr },
  },
  keySeparator: '.',
  fallbackLng: false,
  debug: false,
  interpolation: {
    escapeValue: false,
    format: function (value, format) {
      if (value instanceof Date) {
        return format ? _format(value, format, { locale: _fr }) : value
      }
      return value
    },
  },
})

export default i18n
