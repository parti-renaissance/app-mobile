import { type NativeStackNavigationOptions } from '@react-navigation/native-stack'
import * as Colors from './colors'
import * as Typography from './typography'

export const headerBlank: NativeStackNavigationOptions = {
  title: '',
  headerBackTitle: ' ', // empty string does not remove the title
  headerTintColor: Colors.titleText,
  // headerTransparent: true,
  headerTitleStyle: {
    ...Typography.headline,
    color: Colors.titleText,
  },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
    // hides navigationBar bottom line
  },
}
