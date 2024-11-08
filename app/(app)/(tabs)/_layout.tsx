import React, { useEffect } from 'react'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { ProfileNav, VoxHeader } from '@/components/Header/Header'
import TabBar from '@/components/TabBar/TabBar'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import PageHeader from '@/features/profil/components/PageHeader'
import { pageConfigs } from '@/features/profil/configs'
import { Link2 } from '@tamagui/lucide-icons'
import { Link, Redirect, router, Slot, Tabs } from 'expo-router'
import { isWeb, useMedia, View, XStack } from 'tamagui'

const HomeHeader = () => {
  return (
    <VoxHeader justifyContent="space-between" backgroundColor="$textSurface">
      <XStack flex={1} flexBasis={0}>
        <Link href="/" replace>
          <EuCampaignIllustration cursor="pointer" />
        </Link>
      </XStack>
      <ProfileNav flex={1} flexBasis={0} justifyContent="flex-end" />
    </VoxHeader>
  )
}

const exectParams = (x: string, canShowHeader: boolean) => {
  switch (x) {
    case '(home)':
      return {
        header: () => <HomeHeader />,
        headerShown: canShowHeader,
      }
    case 'profil':
      return {
        header: () => <PageHeader {...pageConfigs.index} backArrow={false} />,
        headerShown: canShowHeader,
      }
    case 'ressources':
      return {
        header: () => <PageHeader title="Ressources" icon={Link2} backArrow={false} />,
        headerShown: canShowHeader,
      }
    default:
      return {
        headerShown: false,
      }
  }
}

export default function AppLayout() {
  const media = useMedia()
  const { isAuth } = useSession()

  return (
    <View style={{ height: isWeb ? '100svh' : '100%' }} position="relative">
      {!isAuth ? (
        <Slot />
      ) : (
        <Tabs tabBar={(props) => <TabBar {...props} hide={media.gtMd} />} screenOptions={{}}>
          {ROUTES.map((route) => (
            <Tabs.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.screenName,
                // @ts-expect-error
                tabBarVisible: !route.hiddenMobile,
                tabBarTheme: route.theme,
                tabBarActiveTintColor: '$color5',
                tabBarInactiveTintColor: '$textPrimary',
                tabBarIcon: ({ focused, ...props }) => <route.icon {...props} />,
                tabBarLabel: route.screenName,
                ...exectParams(route.name, media.md),
              }}
            />
          ))}
        </Tabs>
      )}
    </View>
  )
}
