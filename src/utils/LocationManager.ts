import RNLocation, {
  Location,
  RequestPermissionOptions,
} from 'react-native-location'

export const LocationManager = {
  getLatestLocation: async (): Promise<Location | null> => {
    let permission = await RNLocation.checkPermission(locationPermissionsOption)

    if (!permission) {
      permission = await RNLocation.requestPermission(locationPermissionsOption)
    }
    return RNLocation.getLatestLocation({ timeout: 1000 })
  },
}

const locationPermissionsOption: RequestPermissionOptions = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
}
