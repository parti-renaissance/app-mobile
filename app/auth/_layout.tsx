import { SessionProvider } from '@/ctx'
import 'react-native-url-polyfill/auto'
import { headerBlank } from '@/styles/navigationAppearance'
import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={headerBlank} />
        <Stack.Screen name="sign-up" options={headerBlank} />
        <Stack.Screen
          name="location-picker"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </SessionProvider>
  )
}
