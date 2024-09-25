import { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, router, Stack, useNavigation } from 'expo-router'
import { PortalHost, useMedia, YStack } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={{ header: (x) => <SmallHeader {...x} />, animation: media.gtSm ? 'none' : 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profil',
        }}
      />
    </Stack>
  )
}
