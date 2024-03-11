import React from 'react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import type { IconProps } from '@tamagui/helpers-icon'
import { Calendar as CalendarSvg, Home as HomeSvg, Inbox as InboxSvg, Sparkle as SparkleSvg, Zap as ZapSvg } from '@tamagui/lucide-icons'
import { Tabs, usePathname } from 'expo-router'
import { View } from 'tamagui'

const TAB_BAR_HEIGTH = 60

type TabRoute = {
  name: string
  screenName: string
  icon: React.NamedExoticComponent<IconProps>
  gradiant?: string[]
}

const ROUTES: TabRoute[] = [
  {
    name: 'home',
    screenName: 'Accueil',
    icon: HomeSvg,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'news',
    screenName: 'Actualités',
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
    screenName: 'Événements',
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

const tabBarIcon =
  (pathname: string) =>
  ({ focused }) => {
    const tab = ROUTES.find((route) => route.name === pathname)

    const Icon = ({ focused }) => <tab.icon size={28} color={focused ? tab.gradiant[0] : '#637381'} />

    return (
      <View mt={'$3'}>
        <Icon focused={focused} />
      </View>
    )
  }

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

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarButton: (props) => <Pressable {...props} />,
        tabBarStyle: {
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
            tabBarIcon: tabBarIcon(route.name),
          }}
        />
      ))}
    </Tabs>
  )
}
