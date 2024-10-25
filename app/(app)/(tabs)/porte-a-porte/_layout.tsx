import { useSession } from '@/ctx/SessionProvider'
import { Redirect, Slot } from 'expo-router'
import { useMedia } from 'tamagui'

export default function AppLayout() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(app)/(tabs)/evenements/'} />
  }

  return <Slot />
}
