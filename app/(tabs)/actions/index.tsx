import MobileWall from '@/components/MobileWall/MobileWall'
import { useSession } from '@/ctx/SessionProvider'
import CompActionsScreen from '@/screens/actions/ActionsScreen'
import { Redirect } from 'expo-router'
import { isWeb } from 'tamagui'

export default function ActionsScreen() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  if (isWeb) {
    return <MobileWall />
  }

  // @ts-ignore
  return <CompActionsScreen />
}
