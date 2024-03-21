import React from 'react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/components/Header/Header'
import { ROUTES } from '@/config/routes'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import { Tabs, usePathname } from 'expo-router'
import { useMedia, View } from 'tamagui'

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


  return (
    <>
      <NavBar />
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
            display: media.gtSm ?  'none' : 'flex',
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
                const Icon = ({ focused }) => <route.icon active={focused} />

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
    </>
  )
}
