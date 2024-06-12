import { SmallHeader } from '@/components/Header/Header'
import MobileWallLayout from '@/components/MobileWallLayout/MobileWallLayout'
import { Stack } from 'expo-router'
import { isWeb } from 'tamagui'

export default function AppLayout() {
  return (
    <Stack screenOptions={{ header: SmallHeader, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Actions' }} />
      <Stack.Screen name="phoning/index" options={{ headerShown: false }} />
      <Stack.Screen name="phoning/session/[device]" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="phoning/charter" />
      <Stack.Screen name="phoning/tutorial" />
      <Stack.Screen name="phoning/campaign/brief" />
      <Stack.Screen name="phoning/campaign/scoreboard" />
      <Stack.Screen
        name="polls/[id]"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: false,
        }}
      />
    </Stack>
  )
}
