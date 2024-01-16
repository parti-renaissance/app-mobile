import * as Geolocation from 'expo-location'

export const LocationManager = {
  getLatestLocation: async () => {
   const { status } = await Geolocation.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return null
    }
    return await Geolocation.getCurrentPositionAsync()
  },

  permissionStatus: async (): Promise<boolean> => {
    const { status } = await Geolocation.requestBackgroundPermissionsAsync()
    return status === 'granted'
  },

  requestPermission: async (): Promise<boolean> => {
    const { status } = await Geolocation.requestForegroundPermissionsAsync()
    return status === 'granted'
  }
}
