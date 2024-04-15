import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import VoxToast from '@/components/VoxToast/VoxToast'
import { SessionProvider, useSession } from '@/ctx/SessionProvider'
import useImportFont from '@/hooks/useImportFont'
import { headerBlank } from '@/styles/navigationAppearance'
import TamaguiProvider from '@/tamagui/provider'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlurView } from 'expo-blur'
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router'
import { getTokenValue, isWeb, PortalProvider, Spinner, ViewProps, YStack } from 'tamagui'

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
          <YStack
            justifyContent="center"
            alignItems="center"
            gap="$4"
            height="100%"
            flex={1}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            pointerEvents="none"
          >
            <EuCampaignIllustration />
            <Spinner color="$blue7" size="large" />
          </YStack>
        </>
      )}
    </>
  )
}

function Root() {
  const colorScheme = useColorScheme()
  const queryClient = new QueryClient()
  const [isFontsLoaded] = useImportFont()
  useRegisterRoutingInstrumentation()
  const insets = useSafeAreaInsets()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PortalProvider>
            <ToastProvider>
              <SessionProvider>
                <VoxToast />
                <ToastViewport flexDirection="column" top={getTokenValue('$4', 'space') + insets.top} left={insets.left} right={insets.right} />
                <WaitingRoomHoc isLoading={!isFontsLoaded}>
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
                </WaitingRoomHoc>
              </SessionProvider>
            </ToastProvider>
          </PortalProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export default Root
