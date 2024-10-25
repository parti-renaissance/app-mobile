import { useSession } from '@/ctx/SessionProvider'
import DesktopProfilRouter from '@/features/profil/router/DesktopRouter'
import { Redirect, Slot } from 'expo-router'
import { useMedia } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return media.sm ? <Slot /> : <DesktopProfilRouter key="profil-router" />
}
