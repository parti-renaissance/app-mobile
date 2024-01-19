import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="phoning/index" />
      <Stack.Screen name="phoning/session/[device]" options={{ presentation: 'modal', headerShown: false, }} />
      <Stack.Screen name='phoning/charter' />
      <Stack.Screen name='phoning/tutorial' />
      <Stack.Screen name='phoning/campaign/brief' />
      <Stack.Screen name='phoning/campaign/scoreboard' />
      <Stack.Screen name='polls/[id]' options={{
        headerShown: false,
        presentation: 'modal',
        gestureEnabled: false,
      }} />
    </Stack>
  )
}
