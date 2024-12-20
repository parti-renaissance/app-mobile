import { useEffect } from 'react'
import clientEnv from '@/config/clientEnv'
import * as api from '@/features/matomo/api'
import { usePathname } from 'expo-router'

export const useMatomo = () => {
  const userInfo = {}
  return clientEnv.ENVIRONMENT === 'production'
    ? {
        trackEvent: (data: Parameters<typeof api.trackEvent>[0]) => {
          api.trackEvent({ ...data, ...userInfo })
        },
        trackAction: (data: Parameters<typeof api.trackAction>[0]) => {
          api.trackAction({ ...data, ...userInfo })
        },
        trackScreenView: (data: Parameters<typeof api.trackScreenView>[0]) => {
          api.trackScreenView({ ...data, ...userInfo })
        },
        trackAppStart: (data?: Parameters<typeof api.trackAppStart>[0]) => {
          api.trackAppStart({ ...data, ...userInfo })
        },
      }
    : {
        trackEvent: async (x: Parameters<typeof api.trackEvent>[0]) => {
          console.log('trackEvent', x)
        },
        trackAction: (x: Parameters<typeof api.trackAction>[0]) => {
          console.log('trackAction', x)
        },
        trackScreenView: (x: Parameters<typeof api.trackScreenView>[0]) => {
          console.log('trackScreenView', x)
        },
        trackAppStart: (x?: Parameters<typeof api.trackAppStart>[0]) => {
          console.log('trackAppStart', x)
        },
      }
}

export const useInitMatomo = () => {
  const matomo = useMatomo()
  const pathname = usePathname()
  useEffect(() => {
    matomo.trackAppStart()
  }, [])

  useEffect(() => {
    matomo.trackScreenView({ pathname })
  }, [pathname])
}
