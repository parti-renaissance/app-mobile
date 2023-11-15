import * as RNLocalize from 'react-native-localize'

// fallback if no available language fits
export const fallback = { languageTag: 'fr', languageCode: 'fr', isRTL: false }
export const defaultLanguage =
  RNLocalize.findBestLanguageTag(['fr']) || fallback
