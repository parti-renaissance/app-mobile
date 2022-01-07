import { TextStyle } from 'react-native'
import { Theme } from 'react-native-country-picker-modal/lib/CountryTheme'
import * as Colors from './colors'

const titleFontSize = 45
const androidNavigationTitleFontSize = 20
const title2FontSize = 16
const title3FontSize = 20
const headlineFontSize = 17
const bodyFontSize = 14
const footnoteFontSize = 13
const calloutFontSize = 16
const subheadFontSize = 14
const caption1FontSize = 12
const caption2FontSize = 8

const robotoRegular = 'Roboto-Regular'
const robotoMedium = 'Roboto-Medium'
const maaxMedium = 'Maax-Medium'

export const footnote: TextStyle = {
  fontSize: footnoteFontSize,
  fontFamily: robotoMedium,
  color: Colors.lightText,
  lineHeight: 18,
}

export const footnoteLight: TextStyle = {
  fontSize: footnoteFontSize,
  fontFamily: robotoRegular,
  color: Colors.lightText,
  lineHeight: 18,
}

export const largeTitle: TextStyle = {
  fontSize: titleFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
  lineHeight: 28,
  letterSpacing: 0.56,
}

export const title: TextStyle = {
  fontSize: titleFontSize,
  fontFamily: maaxMedium,
  color: Colors.darkText,
}

export const highlightedTitle: TextStyle = {
  fontSize: titleFontSize,
  fontFamily: maaxMedium,
  color: Colors.accent,
}

export const androidNavigationTitle: TextStyle = {
  fontSize: androidNavigationTitleFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
  textAlign: 'center',
}

export const title2: TextStyle = {
  fontSize: title2FontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
}

export const title3: TextStyle = {
  fontSize: title3FontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
}

export const headline: TextStyle = {
  fontSize: headlineFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
  lineHeight: 22,
  letterSpacing: 0.4,
}

export const thinHeadline: TextStyle = {
  fontSize: headlineFontSize,
  fontFamily: robotoRegular,
  color: Colors.darkText,
  lineHeight: 22,
  letterSpacing: 0.4,
}

export const subheadline: TextStyle = {
  fontSize: subheadFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
}

export const body: TextStyle = {
  fontSize: bodyFontSize,
  fontFamily: robotoRegular,
  lineHeight: 19,
  color: Colors.darkText,
}

export const lightBody: TextStyle = {
  fontSize: bodyFontSize,
  fontFamily: robotoRegular,
  lineHeight: 19,
  color: Colors.lightText,
}

export const callout: TextStyle = {
  fontSize: calloutFontSize,
  fontFamily: maaxMedium,
  color: Colors.darkText,
}

export const caption1: TextStyle = {
  fontSize: caption1FontSize,
  fontFamily: robotoRegular,
  lineHeight: 16,
}

export const lightCaption1: TextStyle = {
  fontSize: caption1FontSize,
  fontFamily: robotoRegular,
  color: Colors.lightText,
}

export const lightCaption1OnLightBackground: TextStyle = {
  fontSize: caption1FontSize,
  fontFamily: robotoRegular,
  color: Colors.lightTextOnLightBackground,
}

export const tagCaption: TextStyle = {
  fontSize: caption2FontSize,
  fontFamily: robotoRegular,
  color: Colors.darkText,
  textTransform: 'uppercase',
}

export const inputText: TextStyle = {
  fontSize: subheadFontSize,
  fontFamily: robotoRegular,
  color: Colors.darkText,
}

export const spinner = {
  color: Colors.veryLightText,
  fontFamily: robotoMedium,
}

export const errorMessage: TextStyle = {
  color: Colors.inputTextErrorMessage,
  fontFamily: robotoRegular,
  fontSize: caption1FontSize,
  lineHeight: 16,
}

export const tabLabel: TextStyle = {
  fontFamily: robotoRegular,
  fontSize: caption1FontSize,
}

export const countryPicker: Theme = {
  fontSize: bodyFontSize,
  fontFamily: robotoRegular,
}

export const phoneNumberPicker: Theme = {
  fontSize: caption1FontSize,
  fontFamily: robotoRegular,
}

export const eventItemTitle: TextStyle = {
  fontSize: bodyFontSize,
  fontFamily: robotoMedium,
  lineHeight: 20,
  color: Colors.darkText,
}
