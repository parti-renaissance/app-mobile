import React from 'react'
import WaitingScreen from '@/components/WaitingScreen'
import { useSession } from '@/ctx/SessionProvider'
import useInit from '@/hooks/useInit'
import { parse, useURL } from 'expo-linking'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { isWeb, View } from 'tamagui'

export default function AppLayout() {
  const { signIn, isAuth, isLoading } = useSession()

  const { code, _switch_user } = useGlobalSearchParams<{ code?: string; _switch_user?: string }>()
  const url = useURL()

  useInit()

  if (!isAuth && !isLoading && (code || url)) {
    if (isWeb && code) {
      signIn({ code, isAdmin: _switch_user === 'true' })
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

  return (
    <View style={{ height: isWeb ? '100svh' : '100%' }} position="relative">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: 'Mon Profil',
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="profil"
          options={{
            title: 'Profil',
          }}
        ></Stack.Screen>
      </Stack>
    </View>
  )
}
