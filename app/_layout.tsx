import { SessionProvider } from '@/ctx'
import { headerBlank } from '@/styles/navigationAppearance'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import '@tamagui/core/reset.css'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import useImportFont from '@/hooks/useImportFont'
import TamaguiProvider from '@/tamagui/provider'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import * as Sentry from '@sentry/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Constants from 'expo-constants'
import { useNavigationContainerRef } from 'expo-router'

const { routingInstrumentation } = ErrorMonitor.configure()

SplashScreen.preventAutoHideAsync()

const useRegisterRoutingInstrumentation = () => {
  const navigationRef = useNavigationContainerRef()

  useEffect(() => {
    if (navigationRef) {
      routingInstrumentation.registerNavigationContainer(navigationRef)
    }
  }, [navigationRef])
}

const useHandleSplashScreen = (isReady: Boolean) => {
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])
}

function Root() {
  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()
  // const [isFontsLoaded] = useImportFont()
  useRegisterRoutingInstrumentation()
  // useHandleSplashScreen(isFontsLoaded)

  // if (!isFontsLoaded) {
  //   return null
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SessionProvider>
            <Stack>
              <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/sign-in" options={headerBlank} />
              <Stack.Screen name="(auth)/sign-up" options={headerBlank} />
              <Stack.Screen
                name="(auth)/code-phone-picker"
                options={{
                  presentation: 'fullScreenModal',
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </SessionProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}


export default Root
