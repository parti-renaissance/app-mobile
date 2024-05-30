import { SmallHeader } from '@/components/Header/Header'
import { useSession } from '@/ctx/SessionProvider'
import i18n from '@/utils/i18n'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={{ header: SmallHeader, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Profil', headerRight: () => null }} />
      <Stack.Screen name="location-picker" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="code-phone-picker" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="country-picker" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="center-of-interest" options={{ title: i18n.t('centerofinterest.title') }} />
      <Stack.Screen name="notification/index" options={{ title: i18n.t('notificationmenu.title') }} />
    </Stack>
  )
}
