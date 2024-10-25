import { useSession } from '@/ctx/SessionProvider'
import DesktopProfilRouter from '@/features/profil/router/DesktopRouter'
import MobileRouter from '@/features/profil/router/MobileRouter'
import { Redirect } from 'expo-router'
import { useMedia } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()
  const media = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return media.sm ? <MobileRouter /> : <DesktopProfilRouter key="profil-router" />
}
