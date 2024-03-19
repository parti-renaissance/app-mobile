import React from 'react'
import { Platform, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/components/Navbar/Navbar'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import { ROUTES } from '@/config/routes'
import { Stack as StackRouter, Tabs, usePathname } from 'expo-router'
import { View } from 'tamagui'

import { useMedia } from 'tamagui'

const IS_WEB = Platform.OS === 'web'
const TAB_BAR_HEIGTH = 60

const getScreenname = (route: string): AnalyticsScreens => {
  const tabRoute = ROUTES.find((tabRoute) => tabRoute.name === route)
  return tabRoute?.screenName as AnalyticsScreens
}

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const media = useMedia()

  React.useEffect(() => {
    Analytics.logNavBarItemSelected(getScreenname(pathname))
  }, [pathname])

  if (media.gtSm && IS_WEB) {
    return (
      <StackRouter
        screenOptions={{
          header: () => <NavBar />,
        }}
      >
        {ROUTES.map((route) => (
          <StackRouter.Screen key={route.name} name={route.name} />
        ))}
      </StackRouter>
    )
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarButton: (props) => <Pressable {...props} />,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 2,
          borderTopColor: 'rgba(145, 158, 171, 0.32)',
          height: TAB_BAR_HEIGTH + insets.bottom,
        },
      }}
    >
      {ROUTES.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarIcon: ({ focused }) => {
              const Icon = ({ focused }) => <route.icon size={28} color={focused ? route.gradiant[0] : '#637381'} />

              return (
                <View>
                  <Icon focused={focused} />
                </View>
              )
            },
          }}
        />
      ))}
    </Tabs>
  )
}
