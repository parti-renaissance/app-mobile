import { SessionProvider } from '@/ctx'
import 'react-native-url-polyfill/auto'
import { Stack, SplashScreen } from 'expo-router'
import { headerBlank } from '@/styles/navigationAppearance'
SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
        <Stack>
          <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-in" options={headerBlank} />
          <Stack.Screen name="(auth)/sign-up" options={headerBlank} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </SessionProvider>
  )
}
