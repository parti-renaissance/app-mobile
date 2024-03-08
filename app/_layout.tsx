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
import { config } from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  const colorScheme = useColorScheme()
  // Set up the auth context and render our layout inside of it.
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
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
