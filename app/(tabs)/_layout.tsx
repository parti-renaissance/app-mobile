import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors, Spacing, Typography } from '@/styles'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import i18n from '@/utils/i18n'
import { Redirect, SplashScreen, Tabs, usePathname } from 'expo-router'

const tabBarIcon =
  (pathname: string, isHighlighted = false) =>
  ({ color, focused }) => {
    return (
      <View
        style={[
          styles.iconContainer,
          isHighlighted ? styles.highlightedIconContainer : undefined,
        ]}
      >
        <Image
          source={getTabBarIcon(pathname, focused)}
          style={{
            tintColor: isHighlighted ? Colors.activeItemBackground : color,
          }}
        />
      </View>
    )
  }

const getTabBarIcon = (route: string, focused: boolean) => {
  switch (route) {
    case 'home':
      return focused
        ? require('@/assets/images/tabBarIconsHomeOn.png')
        : require('@/assets/images/tabBarIconsHomeOff.png')
    case 'news':
      return focused
        ? require('@/assets/images/tabBarIconsNewsOn.png')
        : require('@/assets/images/tabBarIconsNewsOff.png')
    case 'actions':
      return focused
        ? require('@/assets/images/tabBarIconsActOn.png')
        : require('@/assets/images/tabBarIconsActOff.png')
    case 'events':
      return focused
        ? require('@/assets/images/tabBarIconsEventOn.png')
        : require('@/assets/images/tabBarIconsEventOff.png')
    case 'tools':
      return focused
        ? require('@/assets/images/tabBarIconsToolsOn.png')
        : require('@/assets/images/tabBarIconsToolsOff.png')
  }
}

const getScreenname = (route: string): AnalyticsScreens => {
  switch (route) {
    case 'home/':
      return 'Accueil'
    case 'news/':
      return 'Actualités'
    case 'actions/':
      return 'Actions'
    case 'events/':
      return 'Événements'
    case 'tools/':
      return 'Ressources'
  }
}

export default function AppLayout() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()

  React.useEffect(() => {
    Analytics.logNavBarItemSelected(getScreenname(pathname))
  }, [pathname])

  // Set up the auth context and render our layout inside of it.
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => {
          return (
            <Pressable
              android_ripple={{ color: Colors.tabBarRipple }}
              {...props}
            />
          )
        },
        tabBarActiveTintColor: Colors.tabBarActiveTint,
        tabBarInactiveTintColor: Colors.tabBarInactiveTint,
        tabBarLabelStyle: {
          ...Typography.tabLabel,
          marginTop: Spacing.margin,
          marginBottom: Spacing.small,
        },
        tabBarStyle: {
          backgroundColor: Colors.tabBarBackground,
          height: TAB_BAR_HEIGTH + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: tabBarIcon('home'),
          tabBarLabel: i18n.t('tab.item_home'),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          tabBarIcon: tabBarIcon('news'),
          tabBarLabel: i18n.t('tab.item_news'),
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          tabBarIcon: tabBarIcon('actions', true),
          tabBarLabel: i18n.t('tab.item_actions'),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: tabBarIcon('events'),
          tabBarLabel: i18n.t('tab.item_events'),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          tabBarIcon: tabBarIcon('tools'),
          tabBarLabel: i18n.t('tab.item_tools'),
        }}
      />
    </Tabs>
  )
}

const TAB_BAR_HEIGTH = 60
const HIGHLIGHTED_TAB_BACKGROUND_SIZE = 36

const styles = StyleSheet.create({
  highlightedIconContainer: {
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 8,
    height: HIGHLIGHTED_TAB_BACKGROUND_SIZE,
    justifyContent: 'center',
    padding: 8,
    width: HIGHLIGHTED_TAB_BACKGROUND_SIZE,
  },
  iconContainer: {
    marginTop: Spacing.margin + Spacing.small,
  },
})
