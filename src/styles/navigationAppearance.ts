import { type NativeStackNavigationOptions } from '@react-navigation/native-stack'
import * as Colors from './colors'
import * as Typography from './typography'


export const headerBlank: NativeStackNavigationOptions = {
  title: '',
  headerBackTitleVisible: false,
  headerTintColor: Colors.titleText,
  headerTitleStyle: {
    ...Typography.headline,
    color: Colors.titleText,
  },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
  },
}
