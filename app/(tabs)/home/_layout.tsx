import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={headerBlank} />
      <Stack.Screen name="(modals)/news-detail" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/event-detail" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/poll-detail" options={{ headerShown: false }} />
    </Stack>
  )
}
