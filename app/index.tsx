import { useSession } from '@/ctx/SessionProvider'
import { Redirect, useGlobalSearchParams } from 'expo-router'

export default function AuthScreen() {
  const { isAuth, signIn } = useSession()
  const { code } = useGlobalSearchParams<{ code?: string }>()

  if (isAuth) {
    return <Redirect href="/(tabs)/(home)/" />
  } else if (code) {
    signIn({ code })
    return null
  } else {
    return <Redirect href="/(tabs)/evenements/" />
  }
}
