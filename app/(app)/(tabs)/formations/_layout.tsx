import { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'

export default function ActionsScreen() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={{ header: () => null, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Formations' }} />
    </Stack>
  )
}
