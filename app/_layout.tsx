import { SessionProvider } from '@/ctx'
import 'react-native-url-polyfill/auto'
import { SplashScreen, Stack } from 'expo-router'
import { headerBlank} from '@/styles/navigationAppearance'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name='auth/index' options={{headerShown: false}} />
        <Stack.Screen name='auth/sign-in' options={headerBlank} />
        <Stack.Screen name='auth/sign-up' options={headerBlank} />
        <Stack.Screen name='(modals)/location-picker' options={{ presentation: 'modal', }} /> 
      </Stack> 
    </SessionProvider>
  )
}
