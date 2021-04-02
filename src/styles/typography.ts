import { TextStyle } from 'react-native'
import { Theme } from 'react-native-country-picker-modal/lib/CountryTheme'
import * as Colors from './colors'

const titleFontSize = 24
const androidNavigationTitleFontSize = 20
const title2FontSize = 16
const headlineFontSize = 17
const bodyFontSize = 14
const calloutFontSize = 12
const subheadFontSize = 14
const captionFontSize = 8

const robotoRegular = 'Roboto-Regular'
const robotoMedium = 'Roboto-Medium'

export const largeTitle: TextStyle = {
  fontSize: titleFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
  lineHeight: 28,
  letterSpacing: 0.56,
}

export const title: TextStyle = {
  fontSize: titleFontSize,
  fontFamily: robotoMedium,
  color: Colors.darkText,
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

export const headline: TextStyle = {
  fontSize: headlineFontSize,
  fontFamily: robotoMedium,
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

export const caption1: TextStyle = {
  fontSize: calloutFontSize,
  fontFamily: robotoRegular,
  lineHeight: 16,
}

export const lightCallout: TextStyle = {
  fontSize: calloutFontSize,
  fontFamily: robotoRegular,
  color: Colors.lightText,
}

export const lightCalloutOnLightBackground: TextStyle = {
  fontSize: calloutFontSize,
  fontFamily: robotoRegular,
  color: Colors.lightTextOnLightBackground,
}

export const tagCaption: TextStyle = {
  fontSize: captionFontSize,
  fontFamily: robotoRegular,
  color: Colors.veryLightText,
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
  fontSize: calloutFontSize,
  lineHeight: 16,
}

export const tabLabel: TextStyle = {
  fontFamily: robotoRegular,
  fontSize: calloutFontSize,
}

export const countryPicker: Theme = {
  fontSize: bodyFontSize,
  fontFamily: robotoRegular,
}

export const phoneNumberPicker: Theme = {
  fontSize: calloutFontSize,
  fontFamily: robotoRegular,
}

export const eventItemTitle: TextStyle = {
  fontSize: bodyFontSize,
  fontFamily: robotoMedium,
  lineHeight: 20,
}
