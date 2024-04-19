import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/news-detail" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/event-detail" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/poll-detail" options={{ headerShown: false }} />
    </Stack>
  )
}
