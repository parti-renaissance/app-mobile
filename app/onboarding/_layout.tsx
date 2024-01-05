import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
    </Stack>
  )
}
