import { PermissionsAndroid, Platform } from 'react-native'

export const askNativePermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  }
}
