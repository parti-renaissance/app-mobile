import { Stack } from 'expo-router';
import { headerBlank } from '@/styles/navigationAppearance'
import 'react-native-url-polyfill/auto'

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return ( <Stack screenOptions={headerBlank}>
    <Stack.Screen name={'index'} options={{ headerShown: false }} />
  </Stack>);
}
