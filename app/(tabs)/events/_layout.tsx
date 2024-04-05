import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[mode]/filters" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  )
}
