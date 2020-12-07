import { StackNavigationOptions } from '@react-navigation/stack'
import { Platform } from 'react-native'
import * as Spacing from './spacing'
import * as Colors from './colors'
import * as Typography from './typography'

export const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
    // hides navigationBar bottom line
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
  headerTintColor: Colors.navigationTint,
  headerTitleStyle:
    Platform.OS === 'android'
      ? Typography.androidNavigationTitle
      : Typography.title2,
  headerLeftContainerStyle: {
    paddingLeft: Platform.OS === 'android' ? Spacing.unit : 0,
  },
  headerRightContainerStyle: {
    paddingRight: Platform.OS === 'android' ? Spacing.unit : 0,
  },
}

export const headerBlank: StackNavigationOptions = {
  title: '',
  headerBackTitle: ' ', // empty string does not remove the title
  headerTintColor: Colors.navigationTint,
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
    // hides navigationBar bottom line
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
}
