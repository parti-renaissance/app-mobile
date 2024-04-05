import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen
        name="modals/news-detail"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="modals/event-detail"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="modals/poll-detail"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
