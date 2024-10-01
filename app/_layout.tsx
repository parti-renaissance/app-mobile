import React, { useEffect, useRef } from 'react'
import { AppState, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import WaitingScreen from '@/components/WaitingScreen'
import { SessionProvider, useSession } from '@/ctx/SessionProvider'
import useAppUpdate from '@/hooks/useAppUpdate'
import useImportFont from '@/hooks/useImportFont'
import UpdateScreen from '@/screens/update/updateScreen'
import TamaguiProvider from '@/tamagui/provider'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ToastProvider } from '@tamagui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlurView } from 'expo-blur'
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router'
import { isWeb, ViewProps } from 'tamagui'

if (isWeb) {
  require('@tamagui/core/reset.css')
}

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

const WaitingRoomHoc = (props: { children: ViewProps['children']; isLoading?: boolean }) => {
  const { isLoading } = useSession()
  if (isLoading) {
    return <WaitingScreen />
  }
  if (!isLoading && !props.isLoading) {
    SplashScreen.hideAsync()
  }

  return (
    <>
      {props.children}
      {(isLoading || props.isLoading) && (
        <>
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={50}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <WaitingScreen />
        </>
      )}
    </>
  )
}

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

function Root() {
  const appState = useRef(AppState.currentState)

  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()
  const [isFontsLoaded] = useImportFont()
  useRegisterRoutingInstrumentation()

  const { isBuildUpdateAvailable, checkForUpdate, isUpdateAvailable } = useAppUpdate()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        checkForUpdate()
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <TamaguiProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SessionProvider>
                <WaitingRoomHoc isLoading={!isFontsLoaded}>
                  {(isBuildUpdateAvailable || isUpdateAvailable) && !isWeb ? <UpdateScreen isBuildUpdate={isBuildUpdateAvailable} /> : <Slot />}
                </WaitingRoomHoc>
              </SessionProvider>
            </ThemeProvider>
          </TamaguiProvider>
        </QueryClientProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  )
}

export default Root
