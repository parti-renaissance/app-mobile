import React from 'react'
import { PortalLayout } from '@/components/layouts/PortalLayout'
import { Stack } from 'expo-router'
import { isWeb, useMedia, View } from 'tamagui'

export default function AppLayout() {
  const media = useMedia()
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
