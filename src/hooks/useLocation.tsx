import { useSuspenseQuery } from '@tanstack/react-query'
import * as Geolocation from 'expo-location'

class LocationPermissionError extends Error {
  constructor() {
    super('Location permission denied')
    this.name = 'LocationPermissionError'
  }
}

export const useLocationPermission = () => {
  return useSuspenseQuery({
    queryFn: () =>
      Geolocation.requestForegroundPermissionsAsync().then((data) => {
        if (data.status !== 'granted') {
          throw new LocationPermissionError()
        }
        return data
      }),
    queryKey: ['location-permission'],
    retry: false,
  })
}

export const useLocation = () => {
  return useSuspenseQuery({
    queryFn: () =>
      Geolocation.getCurrentPositionAsync({
        accuracy: Geolocation.Accuracy.High,
      }),
    queryKey: ['location'],
    retry: false,
  })
}
