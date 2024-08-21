import { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Stack } from 'expo-router'
import { PortalHost, YStack } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={{ header: (x) => <SmallHeader {...x} />, animation: 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profil',
          headerRight: () => (
            <YStack>
              <PortalHost name="ProfilHeaderRight"></PortalHost>
            </YStack>
          ),
        }}
      />
      <Stack.Screen
        name="informations-personnelles"
        options={{
          title: 'Informations Personelles',
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="cotisation-et-dons"
        options={{
          title: 'Cotisation et Dons',
          headerRight: () => null,
        }}
      />
    </Stack>
  )
}
