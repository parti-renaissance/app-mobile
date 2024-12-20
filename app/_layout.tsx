import React, { useEffect, useRef } from 'react'
import { AppState, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import WaitingScreen from '@/components/WaitingScreen'
import { SessionProvider, useSession } from '@/ctx/SessionProvider'
import { useInitMatomo } from '@/features/matomo/hook'
import { useInitPushNotification } from '@/features/push-notification/hook'
import initRootAppNotification from '@/features/push-notification/logic/initRootAppNotification'
import useAppUpdate from '@/hooks/useAppUpdate'
import useImportFont from '@/hooks/useImportFont'
import UpdateScreen from '@/screens/update/updateScreen'
import TamaguiProvider from '@/tamagui/provider'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ToastProvider } from '@tamagui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlurView } from 'expo-blur'
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router'
import { isWeb, ViewProps } from 'tamagui'

if (isWeb) {
  require('@tamagui/core/reset.css')
}

initRootAppNotification()

const { navigationIntegration } = ErrorMonitor.configure()

SplashScreen.preventAutoHideAsync()

const useRegisterRoutingInstrumentation = () => {
  const navigationRef = useNavigationContainerRef()

  useEffect(() => {
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef)
    }
  }, [navigationRef])
}

const WaitingRoomHoc = (props: { children: ViewProps['children']; isLoading?: boolean }) => {
  useInitMatomo()
  const { isLoading, isAuth } = useSession()
  useInitPushNotification({ enable: isAuth && !isLoading && !props.isLoading })
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
      },
    },
  })
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider swipeDirection="up">
        <QueryClientProvider client={queryClient}>
          <TamaguiProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <BottomSheetModalProvider>
                <SessionProvider>
                  <WaitingRoomHoc isLoading={!isFontsLoaded}>
                    {(isBuildUpdateAvailable || isUpdateAvailable) && !isWeb ? <UpdateScreen isBuildUpdate={isBuildUpdateAvailable} /> : <Slot />}
                  </WaitingRoomHoc>
                </SessionProvider>
              </BottomSheetModalProvider>
            </ThemeProvider>
          </TamaguiProvider>
        </QueryClientProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  )
}

export default ErrorMonitor.wrap(Root)
