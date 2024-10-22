import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { NavBar, ProfileNav, VoxHeader } from '@/components/Header/Header'
import MoreSheet from '@/components/TabBar/MoreSheet'
import TabBar from '@/components/TabBar/TabBar'
import { ROUTES } from '@/config/routes'
import { useSession } from '@/ctx/SessionProvider'
import { TabRouter } from '@react-navigation/native'
import { Link, Navigator, Slot, Tabs, useSegments } from 'expo-router'
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
      {/* <MoreSheet /> */}
      {media.gtMd ? (
        <CustomRouter />
      ) : (
        <Tabs
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          {ROUTES.map((route) => (
            <Tabs.Screen
              key={route.name}
              name={route.name}
              options={{
                // @ts-expect-error
                tabBarVisible: !route.hiddenMobile,
                tabBarTheme: route.theme,
                tabBarActiveTintColor: '$color5',
                tabBarInactiveTintColor: '$textPrimary',
                tabBarIcon: ({ focused, ...props }) => <route.icon {...props} />,
                tabBarLabel: route.screenName,
              }}
            />
          ))}
        </Tabs>
      )}
    </View>
  )
}
