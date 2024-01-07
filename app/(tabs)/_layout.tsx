import { SessionProvider, useSession } from '@/ctx'
import 'react-native-url-polyfill/auto'
import { Redirect, Slot, SplashScreen, Stack, Tabs } from 'expo-router'

export default function AppLayout() {
  const { isLoading, isLoggedIn } = useSession()

  if (isLoading) {
    return null
  } else {
    SplashScreen.hideAsync()
  }

  if (!isLoggedIn) {
    return <Redirect href="/auth/" />
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  )
}
