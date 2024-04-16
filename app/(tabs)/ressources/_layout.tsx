import { useSession } from '@/ctx/SessionProvider'
import { headerBlank } from '@/styles/navigationAppearance'
import { Redirect, Stack } from 'expo-router'

export default function ActionsScreen() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
