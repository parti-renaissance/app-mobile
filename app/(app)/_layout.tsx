import React from 'react'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { NavBar, ProfileNav, VoxHeader } from '@/components/Header/Header'
import { PortalLayout } from '@/components/layouts/PortalLayout'
import { TabRouter } from '@react-navigation/native'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Link, Navigator, Slot, Stack } from 'expo-router'
import { isWeb, useMedia, View, XStack, YStack } from 'tamagui'

function CustomRouter() {
  return (
    <Navigator router={TabRouter}>
      <YStack flex={1}>
        <VoxHeader justifyContent="space-between">
          <XStack flex={1} flexBasis={0}>
            <Link href="/" replace>
              <EuCampaignIllustration cursor="pointer" />
            </Link>
          </XStack>
          <NavBar />
          <ProfileNav flex={1} flexBasis={0} justifyContent="flex-end" />
        </VoxHeader>
        <Slot />
      </YStack>
    </Navigator>
  )
}

export default function AppLayout() {
  const media = useMedia()
  return media.gtSm ? (
    <CustomRouter />
  ) : (
    <PortalLayout>
      <View style={{ height: isWeb ? '100svh' : '100%' }} position="relative">
        <Stack screenOptions={{ animation: 'slide_from_right' }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: '',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="profil"
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="evenements/[id]"
            options={{
              header: (x) => (
                <VoxHeader>
                  <VoxHeader.LeftButton backTitle="Événements" icon={ArrowLeft} />
                </VoxHeader>
              ),
            }}
          />
          <Stack.Screen name="porte-a-porte/building-detail" options={{ title: '' }} />
          <Stack.Screen name="porte-a-porte/tunnel" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        </Stack>
      </View>
    </PortalLayout>
  )
}
