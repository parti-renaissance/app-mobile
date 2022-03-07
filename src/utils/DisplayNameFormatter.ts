import { FormatDisplayNameOptions } from 'react-intl'
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-displaynames/polyfill'
import { loadIntl } from './intl'

const formatDisplayName = (
  value: string,
  type: FormatDisplayNameOptions['type'],
): string => {
  if (value === '') {
    return ''
  }
  return loadIntl().formatDisplayName(value, { type: type }) ?? value
}

export const DisplayNameFormatter = {
  formatLanguage: (value: string): string => {
    return formatDisplayName(value, 'language')
  },
  formatRegion: (value: string): string => {
    return formatDisplayName(value, 'region')
  },
}
