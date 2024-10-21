import React, { NamedExoticComponent } from 'react'
import Animated, { FadingTransition, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import Text from '@/components/base/Text'
import { NavBar, ProfileNav, ProfileView, SmallHeader, VoxHeader } from '@/components/Header/Header'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import TabBar from '@/components/TabBar/TabBar'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import { TabRouter } from '@react-navigation/native'
import { Link, Navigator, Redirect, router, Slot, Stack, Tabs, useSegments } from 'expo-router'
import { isWeb, useMedia, View, XStack, YStack } from 'tamagui'

const TAB_BAR_HEIGHT = 80

function CustomRouter() {
  const media = useMedia()
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
        {media.sm ? <TabBar /> : null}
      </YStack>
    </Navigator>
  )
}

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const media = useMedia()
  const { session, isAuth } = useSession()
  const [openSheet, setOpenSheet] = React.useState(false)

  const segments = useSegments()
  const getTabBarVisibility = () => {
    const hideOnScreens = ['tunnel', 'building-detail', 'polls'] // put here name of screen where you want to hide tabBar
    return hideOnScreens.map((screen) => segments.includes(screen)).some(Boolean)
  }

  return (
    <View style={{ height: isWeb ? '100svh' : '100%' }} position="relative">
      <CustomRouter />
    </View>
  )
}
