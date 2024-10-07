import React from 'react'
import { PortalLayout } from '@/components/layouts/PortalLayout'
import WaitingScreen from '@/components/WaitingScreen'
import { useSession } from '@/ctx/SessionProvider'
import useInit from '@/hooks/useInit'
import { parse, useURL } from 'expo-linking'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { isWeb, useMedia, View } from 'tamagui'

export default function AppLayout() {
  const { signIn, isAuth, isLoading } = useSession()

  const { code, _switch_user } = useGlobalSearchParams<{ code?: string; _switch_user?: string }>()
  const url = useURL()
  const media = useMedia()

  useInit()

  if (!isLoading && (code || url)) {
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
    <PortalLayout>
      <View style={{ height: isWeb ? '100svh' : '100%' }} position="relative">
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              title: '',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="profil"
            options={{
              title: 'Profil',
              animation: media.gtSm ? 'none' : 'slide_from_right',
            }}
          ></Stack.Screen>
        </Stack>
      </View>
    </PortalLayout>
  )
}
