import * as Sentry from '@sentry/react-native'
import { ENVIRONMENT, SENTRY_DSN } from '../Config'

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
      console.warn(message, payload)
    } else {
      Sentry.captureMessage(message, { extra: payload })
    }
  },
  wrap: <P>(RootComponent: React.ComponentType<P>): React.ComponentType<P> => {
    return Sentry.wrap(RootComponent)
  },
}
