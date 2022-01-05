import { TextStyle, ViewStyle } from 'react-native'
import { Spacing, Typography } from '.'
import * as Colors from './colors'

export const topElevatedContainerStyle: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -2,
  },
  shadowRadius: 4,
  shadowOpacity: 0.2,
  elevation: 10,
  backgroundColor: Colors.defaultBackground,
}

export const elevatedContainerStyle: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 4,
  shadowOpacity: 0.2,
  elevation: 10,
  backgroundColor: Colors.defaultBackground,
}

export const cardViewContainerStyle: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 4,
  shadowOpacity: 0.2,
}

export const homeSeeMoreButtonTextStyle: TextStyle = {
  color: Colors.coloredText,
  textAlign: 'left',
}

export const eventSeeMoreButtonTextStyle: TextStyle = {
  ...Typography.body,
  color: Colors.coloredText,
  textAlign: 'left',
  lineHeight: 19,
}

export const homeSeeMoreButtonContainer: ViewStyle = {
  alignSelf: 'flex-start',
}

export const eventSeeMoreButtonContainer: ViewStyle = {
  alignSelf: 'flex-start',
  paddingHorizontal: 0,
  paddingVertical: 0,
  marginTop: Spacing.small,
}

export const eventTag1 = {
  textColor: '#ffffff',
  backgroundColor: '#4489f7',
}

export const eventTag2 = {
  textColor: '#ffffff',
  backgroundColor: '#1C00FF',
}

export const eventTag3 = {
  textColor: '#413D45',
  backgroundColor: '#B1D8FF',
}
