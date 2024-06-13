import { useSuspenseQuery } from '@tanstack/react-query'
import * as Geolocation from 'expo-location'

export class LocationPermissionError extends Error {
  constructor() {
    super('Location permission denied')
    this.name = 'LocationPermissionError'
  }
}

export const QUERY_KEY_LOCATION = 'location'

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
      Geolocation.getLastKnownPositionAsync()
        .then((data) => {
          if (!data) {
            return Geolocation.getCurrentPositionAsync({
              accuracy: Geolocation.Accuracy.BestForNavigation,
            }).then((data) => data)
          }
          return data
        })
        .catch(() => {
          throw new LocationPermissionError()
        }),
    queryKey: ['location'],
    retry: false,
  })
}
