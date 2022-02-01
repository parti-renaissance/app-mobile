import React from 'react'
import { Image, Pressable, View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors, Spacing, Typography } from '../styles'
import ToolsScreen from './tools/ToolsScreen'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'
import HomeNavigator from './home/HomeNavigator'
import EventNavigator from './events/EventNavigator'
import ActionsNavigator from './actions/ActionsNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Analytics } from '../utils/Analytics'

const Tab = createBottomTabNavigator()

const getTabBarIcon = (route: any, focused: boolean) => {
  if (route.name === Screen.actionsNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsActOn.png')
      : require('../assets/images/tabBarIconsActOff.png')
  } else if (route.name === Screen.homeNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsHomeOn.png')
      : require('../assets/images/tabBarIconsHomeOff.png')
  } else if (route.name === Screen.eventNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsEventOn.png')
      : require('../assets/images/tabBarIconsEventOff.png')
  } else if (route.name === Screen.tools) {
    return focused
      ? require('../assets/images/tabBarIconsToolsOn.png')
      : require('../assets/images/tabBarIconsToolsOff.png')
  } else if (route.name === Screen.phoningNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsPhoningOn.png')
      : require('../assets/images/tabBarIconsPhoningOff.png')
  }
}

const TAB_BAR_HEIGTH = 60
const HIGHLIGHTED_TAB_BACKGROUND_SIZE = 36

const AuthenticatedHomeScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: (props) => {
          return (
            <Pressable
              android_ripple={{ color: Colors.tabBarRipple }}
              {...props}
            />
          )
        },
        tabBarIcon: ({ color, focused }) => {
          const isHighlighted = route.name === Screen.actionsNavigator
          return (
            <View
              style={[
                styles.iconContainer,
                isHighlighted ? styles.highlightedIconContainer : undefined,
              ]}
            >
              <Image
                source={getTabBarIcon(route, focused)}
                style={{
                  tintColor: isHighlighted
                    ? Colors.activeItemBackground
                    : color,
                }}
              />
            </View>
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
      })}
    >
      <Tab.Screen
        name={Screen.homeNavigator}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Accueil')
          },
        }}
      />
      <Tab.Screen
        name={Screen.actionsNavigator}
        component={ActionsNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_actions') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Actions')
          },
        }}
      />
      <Tab.Screen
        name={Screen.eventNavigator}
        component={EventNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_events') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Événements')
          },
        }}
      />
      <Tab.Screen
        name={Screen.tools}
        component={ToolsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_tools') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Ressources')
          },
        }}
      />
    </Tab.Navigator>
  )
}

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

export default AuthenticatedHomeScreen
