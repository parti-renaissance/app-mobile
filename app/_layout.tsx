import { SessionProvider } from '@/ctx'
import { headerBlank } from '@/styles/navigationAppearance'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import '@tamagui/core/reset.css'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from '@tamagui/core'
import { config } from '../tamagui.config'
import * as Sentry from '@sentry/react-native'
import { ENVIRONMENT, SENTRY_DSN } from '@/config/env'
import { useNavigationContainerRef } from 'expo-router';
import React from 'react'

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: SENTRY_DSN,
  debug: ENVIRONMENT !== 'production', // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
});

SplashScreen.preventAutoHideAsync()

function Root() {
  const colorScheme = useColorScheme()
  // Set up the auth context and render our layout inside of it.
  const navigationRef = useNavigationContainerRef()

  React.useEffect(() => {
    if (navigationRef) {
      routingInstrumentation.registerNavigationContainer(navigationRef);
    }
  }, [navigationRef]);

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <Stack>
            <Stack.Screen
              name="(auth)/onboarding"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)/sign-in" options={headerBlank} />
            <Stack.Screen name="(auth)/sign-up" options={headerBlank} />
            <Stack.Screen name="(auth)/code-phone-picker" options={{
          presentation: 'fullScreenModal',
        }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}

export default Sentry.wrap(Root)
