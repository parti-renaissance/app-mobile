import React from 'react'
import { Image, Platform } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Colors, Spacing, Typography } from '../styles'
import ToolsScreen from './tools/ToolsScreen'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'
import { useTheme } from '../themes'
import HomeNavigator from './home/HomeNavigator'
import EventNavigator from './events/EventNavigator'
import ActionsNavigator from './actions/ActionsNavigator'

const TabAndroid = createMaterialBottomTabNavigator()
const TabIos = createBottomTabNavigator()

const getTabBarIcon = (route: any, focused: boolean) => {
  if (route.name === Screen.actions) {
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

const AuthenticatedHomeScreenAndroid = () => {
  const { theme } = useTheme()
  return (
    <TabAndroid.Navigator
      initialRouteName={Screen.homeNavigator}
      backBehavior="initialRoute"
      activeColor={theme.coloredText}
      inactiveColor={Colors.tab}
      shifting={false}
      barStyle={{ backgroundColor: Colors.defaultBackground }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          return (
            <Image
              source={getTabBarIcon(route, focused)}
              style={{ tintColor: color }}
            />
          )
        },
      })}
    >
      <TabAndroid.Screen
        name={Screen.homeNavigator}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
      />
      <TabAndroid.Screen
        name={Screen.actions}
        component={ActionsNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_actions') }}
      />
      <TabAndroid.Screen
        name={Screen.eventNavigator}
        component={EventNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_events') }}
      />
      <TabAndroid.Screen
        name={Screen.tools}
        component={ToolsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_tools') }}
      />
    </TabAndroid.Navigator>
  )
}

const AuthenticatedHomeScreenIos = () => {
  const { theme } = useTheme()
  return (
    <TabIos.Navigator
      tabBarOptions={{
        activeTintColor: theme.coloredText,
        inactiveTintColor: Colors.tab,
        labelStyle: {
          ...Typography.tabLabel,
          marginBottom: Spacing.small,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          return (
            <Image
              source={getTabBarIcon(route, focused)}
              style={{ tintColor: color }}
            />
          )
        },
      })}
    >
      <TabIos.Screen
        name={Screen.homeNavigator}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
      />
      <TabIos.Screen
        name={Screen.actions}
        component={ActionsNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_actions') }}
      />
      <TabIos.Screen
        name={Screen.eventNavigator}
        component={EventNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_events') }}
      />
      <TabIos.Screen
        name={Screen.tools}
        component={ToolsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_tools') }}
      />
    </TabIos.Navigator>
  )
}

const AuthenticatedHomeScreen = () =>
  Platform.OS === 'android' ? (
    <AuthenticatedHomeScreenAndroid />
  ) : (
    <AuthenticatedHomeScreenIos />
  )

export default AuthenticatedHomeScreen
