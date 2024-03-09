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
import { TamaguiProvider, View } from '@tamagui/core'
import Constants from 'expo-constants'
import { config } from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

function Root() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <Stack>
            <Stack.Screen
              name="(auth)/onboarding"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)/sign-in" options={headerBlank} />
            <Stack.Screen name="(auth)/sign-up" options={headerBlank} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}

/**
 * This is the entry point for your app with the following logic:
 * - If storybookEnabled is true, render Storybook
 * - Otherwise, render your app
 */
let AppEntryPoint = Root

if (Constants.expoConfig.extra.storybookEnabled === 'true') {
  SplashScreen.hideAsync()

  AppEntryPoint = require('../.storybook').default
}

export default AppEntryPoint
