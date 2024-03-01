import Geolocation, {
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation'

let permissionStatus = false

const askPermission = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization(resolve, reject)
  })
}

const getLatestLocation = async (
  opt?: GeolocationOptions,
): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, opt)
  })
}

export const LocationManager = {
  getLatestLocation: () => {
    return getLatestLocation({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    })
  },

  permissionStatus: async (): Promise<boolean> => permissionStatus,

  requestPermission: async (): Promise<boolean> =>
    askPermission()
      .then((_) => {
        permissionStatus = true
        return true
      })
      .catch((_) => {
        permissionStatus = false
        return false
      }),
}
