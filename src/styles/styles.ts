import { TextStyle, ViewStyle } from 'react-native'
import Theme from '../themes/Theme'
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

export const homeSeeMoreButtonTextStyle = (theme: Theme) => {
  const style: TextStyle = {
    color: theme.coloredText,
    textAlign: 'left',
  }
  return style
}

export const homeSeeMoreButtonContainer: ViewStyle = {
  alignSelf: 'flex-start',
}
