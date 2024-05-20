import { type NativeStackNavigationOptions } from '@react-navigation/native-stack'
import * as Colors from './colors'

export const headerBlank: NativeStackNavigationOptions = {
  title: '',
  headerBackTitleVisible: false,
  headerTintColor: Colors.titleText,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
  },
}
