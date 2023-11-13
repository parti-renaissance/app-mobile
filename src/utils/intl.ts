import { createIntl, createIntlCache, IntlShape } from "react-intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import * as RNLocalize from "react-native-localize";
import { defaultLanguage } from "./defaultLanguage";

const loadLocale = (locale: string) => {
  // (Pierre Felgines) 09/06/2020 We can't dynamically require a file,
  // so we need this huge switch...
  switch (locale) {
    case "fr":
      require("@formatjs/intl-displaynames/locale-data/fr");
      break;
  }
};

let _intl: IntlShape | undefined;

export const loadIntl = (): IntlShape => {
  if (_intl === undefined) {
    const locale = defaultLanguage.languageTag;
    loadLocale(locale);
    const cache = createIntlCache();
    _intl = createIntl({ locale: locale, messages: {}, timeZone: RNLocalize.getTimeZone() }, cache);
  }
  return _intl;
};
