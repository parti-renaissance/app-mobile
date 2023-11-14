import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'
import ToolsScreen from '../../screens/tools/ToolsScreen'
import { Colors, Spacing, Typography } from '../../styles'
import { Analytics } from '../../utils/Analytics'
import i18n from '../../utils/i18n'
import ActionsNavigator from '../actions/ActionsNavigator'
import EventNavigator from '../event/EventNavigator'
import HomeNavigator from '../home/HomeNavigator'
import NewsNavigator from '../news/NewsNavigator'
import { TabBarNavigatorParamList } from './TabBarNavigatorParamList'

const Tab = createBottomTabNavigator<TabBarNavigatorParamList>()

const getTabBarIcon = (
  route: RouteProp<TabBarNavigatorParamList, keyof TabBarNavigatorParamList>,
  focused: boolean,
) => {
  switch (route.name) {
    case 'HomeNavigator':
      return focused
        ? require('../../assets/images/tabBarIconsHomeOn.png')
        : require('../../assets/images/tabBarIconsHomeOff.png')
    case 'NewsNavigator':
      return focused
        ? require('../../assets/images/tabBarIconsNewsOn.png')
        : require('../../assets/images/tabBarIconsNewsOff.png')
    case 'ActionsNavigator':
      return focused
        ? require('../../assets/images/tabBarIconsActOn.png')
        : require('../../assets/images/tabBarIconsActOff.png')
    case 'EventNavigator':
      return focused
        ? require('../../assets/images/tabBarIconsEventOn.png')
        : require('../../assets/images/tabBarIconsEventOff.png')
    case 'Tools':
      return focused
        ? require('../../assets/images/tabBarIconsToolsOn.png')
        : require('../../assets/images/tabBarIconsToolsOff.png')
  }
}

const TAB_BAR_HEIGTH = 60
const HIGHLIGHTED_TAB_BACKGROUND_SIZE = 36

export const TabBarNavigator = () => {
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
          const isHighlighted = route.name === 'ActionsNavigator'
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
        name={'HomeNavigator'}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Accueil')
          },
        }}
      />
      <Tab.Screen
        name={'NewsNavigator'}
        component={NewsNavigator}
        options={{
          tabBarLabel: i18n.t('tab.item_news'),
        }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Actualités')
          },
        }}
      />
      <Tab.Screen
        name={'ActionsNavigator'}
        component={ActionsNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_actions') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Actions')
          },
        }}
      />
      <Tab.Screen
        name={'EventNavigator'}
        component={EventNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_events') }}
        listeners={{
          tabPress: () => {
            Analytics.logNavBarItemSelected('Événements')
          },
        }}
      />
      <Tab.Screen
        name={'Tools'}
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
