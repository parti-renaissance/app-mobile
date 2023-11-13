import * as Sentry from "@sentry/react-native";
import { ENVIRONMENT, SENTRY_DSN } from "../Config";

export const ErrorMonitor = {
  configure: () => {
    if (!__DEV__ && SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: ENVIRONMENT,
      });
    }
  },
  log: (message: string, payload?: Record<string, unknown>) => {
    if (__DEV__) {
      console.log("[ErrorMonitor]", message, payload);
    } else {
      Sentry.captureMessage(message, { extra: payload });
    }
  },
  wrap: (RootComponent: React.ComponentType<Record<string, any>>) => {
    return Sentry.withProfiler(RootComponent);
  },
  setUser: (options: { id: string; email: string }) => {
    const { id, email } = options;
    if (__DEV__) {
      console.log("[ErrorMonitor] setUser", options);
    } else {
      Sentry.setUser({ id, email });
    }
  },
  clearUser: () => {
    if (__DEV__) {
      console.log("[ErrorMonitor] clearUser");
    } else {
      Sentry.configureScope((scope) => scope.setUser(null));
    }
  },
};
