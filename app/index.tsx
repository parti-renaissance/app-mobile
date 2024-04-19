import WaitingScreen from '@/components/WaitingScreen'
import { useSession } from '@/ctx/SessionProvider'
import { parse, useURL } from 'expo-linking'
import { Redirect, useGlobalSearchParams } from 'expo-router'
import { isWeb } from 'tamagui'

export default function AuthScreen() {
  const { isAuth, signIn } = useSession()
  const { code } = useGlobalSearchParams<{ code?: string }>()
  const url = useURL()

  if (isAuth) {
    return <Redirect href="/(tabs)/(home)/" />
  } else if (code || url) {
    if (isWeb && code) {
      signIn({ code })
      return <WaitingScreen />
    }
    if (url && !isWeb) {
      const { queryParams } = parse(url)
      const code = queryParams?.code as string | undefined

      if (code) {
        signIn({ code })
        return <WaitingScreen />
      }
    }
  }
  return <Redirect href="/(tabs)/evenements/" />
}
