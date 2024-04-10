import { SessionProvider } from '@/ctx/SessionProvider'
import { headerBlank } from '@/styles/navigationAppearance'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router'
import '@tamagui/core/reset.css'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import VoxToast from '@/components/VoxToast/VoxToast'
import useImportFont from '@/hooks/useImportFont'
import TamaguiProvider from '@/tamagui/provider'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getTokenValue, PortalProvider, Spinner } from 'tamagui'

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

function Root() {
  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()
  const [isFontsLoaded] = useImportFont()
  useRegisterRoutingInstrumentation()
  const insets = useSafeAreaInsets()

  if (!isFontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PortalProvider>
            <ToastProvider>
              <SessionProvider>
                <VoxToast />
                <ToastViewport flexDirection="column" top={getTokenValue('$4', 'space') + insets.top} left={insets.left} right={insets.right} />
                <Stack>
                  <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
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
            </ToastProvider>
          </PortalProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export default Root
