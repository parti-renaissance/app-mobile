import * as Sentry from 'sentry-expo'
import { ENVIRONMENT, SENTRY_DSN } from '@/config/env'
import { Platform } from 'react-native'

export const ErrorMonitor = {
  configure: () => {
    if (!__DEV__ && SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: ENVIRONMENT,
      })
    }
  },
  log: (message: string, payload?: Record<string, unknown>) => {
    if (__DEV__) {
      console.log('[ErrorMonitor]', message, payload)
    } else {
      Platform.OS === 'web'
        ? Sentry.Browser.captureMessage(message, { extra: payload })
        : Sentry.Native.captureMessage(message, { extra: payload })
    }
  },
  wrap: (RootComponent: React.ComponentType<Record<string, any>>) => {
    return Platform.OS === 'web'
      ? Sentry.Browser.withProfiler(RootComponent)
      : Sentry.Native.withProfiler(RootComponent)
  },
  setUser: (options: { id: string; email: string }) => {
    const { id, email } = options
    if (__DEV__) {
      console.log('[ErrorMonitor] setUser', options)
    } else {
      Platform.OS === 'web'
        ? Sentry.Browser.setUser({ id, email })
        : Sentry.Native.setUser({ id, email })
    }
  },
  clearUser: () => {
    if (__DEV__) {
      console.log('[ErrorMonitor] clearUser')
    } else {
      Platform.OS === 'web'
        ? Sentry.Browser.configureScope((scope) => scope.setUser(null))
        : Sentry.Native.configureScope((scope) => scope.setUser(null))
    }
  },
}
