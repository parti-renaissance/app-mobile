import React from 'react'
import { Platform, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/components/Navbar/Navbar'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import type { IconProps } from '@tamagui/helpers-icon'
import { Calendar as CalendarSvg, Home as HomeSvg, Inbox as InboxSvg, Sparkle as SparkleSvg, Zap as ZapSvg } from '@tamagui/lucide-icons'
import { Stack as StackRouter, Tabs, usePathname } from 'expo-router'
import { View } from 'tamagui'

const IS_WEB = Platform.OS === 'web'
const TAB_BAR_HEIGTH = 60

type TabRoute = {
  name: string
  screenName: string
  icon: React.NamedExoticComponent<IconProps>
  gradiant?: string[]
}

export const ROUTES: TabRoute[] = [
  {
    name: 'home',
    screenName: 'Fil',
    icon: HomeSvg,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'news',
    screenName: 'Événements',
    icon: CalendarSvg,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
    icon: ZapSvg,
    gradiant: ['#68F984', '#06B827'],
  },
  {
    name: 'events',
    screenName: 'Ripostes',
    icon: SparkleSvg,
    gradiant: ['#FDA302', '#F7681E'],
  },
  {
    name: 'tools',
    screenName: 'Ressources',
    icon: InboxSvg,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
]

const getScreenname = (route: string): AnalyticsScreens => {
  const tabRoute = ROUTES.find((tabRoute) => tabRoute.name === route)
  return tabRoute?.screenName as AnalyticsScreens
}

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()

  React.useEffect(() => {
    Analytics.logNavBarItemSelected(getScreenname(pathname))
  }, [pathname])

  if (IS_WEB) {
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
