import { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'
import { PortalHost } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={{ header: SmallHeader, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Profil', headerRight: () => <PortalHost name="ProfilHeaderRight" /> }} />
    </Stack>
  )
}
