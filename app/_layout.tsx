import { SessionProvider } from '@/ctx'
import 'react-native-url-polyfill/auto'
import { Slot, SplashScreen } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
