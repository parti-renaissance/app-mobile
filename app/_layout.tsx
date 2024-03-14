import { SessionProvider } from '@/ctx'
import { headerBlank } from '@/styles/navigationAppearance'
import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
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
  )
}
