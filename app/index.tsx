import { useSession } from '@/ctx/SessionProvider'
import { Redirect } from 'expo-router'

export default function () {
  const { session, isLoading } = useSession()
  if (isLoading) {
    return null
  }
  return <Redirect href={session ? '/(tabs)/home' : '/(tabs)/events'} />
}
