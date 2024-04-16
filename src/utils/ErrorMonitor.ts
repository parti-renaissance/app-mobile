import * as Sentry from '@sentry/react-native'

export const ErrorMonitor = {
  configure: () => {
    const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

    Sentry.init({
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT,
      enabled: !__DEV__,
      //debug: ENVIRONMENT !== 'production', // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
      integrations: [
        new Sentry.ReactNativeTracing({
          // Pass instrumentation to be used as `routingInstrumentation`
          routingInstrumentation,
          // ...
        }),
      ],
    });
     return { routingInstrumentation}
  },
  log: (message: string, payload?: Record<string, unknown>) => {
    if (__DEV__) {
      console.log('[ErrorMonitor]', message, payload)
    } else {
      Sentry.captureMessage(message, { extra: payload })
    }
  },
  wrap: (RootComponent: React.ComponentType<Record<string, any>>) => {
      Sentry.withProfiler(RootComponent)
  },
  setUser: (options: { id: string; email: string }) => {
    const { id, email } = options
    if (__DEV__) {
      console.log('[ErrorMonitor] setUser', options)
    } else {
        Sentry.setUser({ id, email })
    }
  },
  clearUser: () => {
    if (__DEV__) {
      console.log('[ErrorMonitor] clearUser')
    } else {
         Sentry.configureScope((scope) => scope.setUser(null))
    }
  },
}
