import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function DoorToDoorLayout() {
  return (
    <Stack screenOptions={{ ...headerBlank, headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tunnel" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}
