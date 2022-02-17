import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import PollDetailModalNavigator, {
  PollDetailModalNavigatorParamList,
} from './PollDetailModalNavigator'
import ProfileModalNavigator, {
  ProfileModalNavigatorParamList,
} from './ProfileModalNavigator'
import PhoningSessionModalNavigator, {
  PhoningSessionModalNavigatorParamList,
} from './PhoningSessionModalNavigator'
import DoorToDoorTunnelModalNavigator, {
  DoorToDoorTunnelModalNavigatorParamList,
} from './DoorToDoorTunnelModalNavigator'
import { TabBarNavigator, TabBarNavigatorParamList } from './TabBarNavigator'
import { NavigatorScreenParams } from '@react-navigation/native'
import NewsDetailModalNavigator, {
  NewsDetailModalNavigatorParamList,
} from './NewsDetailModalNavigator'
import {
  EventsFilterModalNavigator,
  EventsFilterModalNavigatorParamList,
} from './EventsFilterModalNavigator'

export type AuthenticatedRootNavigatorParamList = {
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalNavigatorParamList>
  PhoningSessionModal: NavigatorScreenParams<PhoningSessionModalNavigatorParamList>
  ProfileModal: NavigatorScreenParams<ProfileModalNavigatorParamList>
  Login: undefined
  TermsOfUse: undefined
  News: undefined
  DoorToDoorTunnelModal: NavigatorScreenParams<DoorToDoorTunnelModalNavigatorParamList>
  NewsDetailModal: NavigatorScreenParams<NewsDetailModalNavigatorParamList>
  EventsFilterModal: NavigatorScreenParams<EventsFilterModalNavigatorParamList>
}

export type AuthenticatedRootNavigatorScreenProps = StackScreenProps<AuthenticatedRootNavigatorParamList>

const Stack = createStackNavigator<AuthenticatedRootNavigatorParamList>()

export const AuthenticatedRootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={'TabBarNavigator'} component={TabBarNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        {/* We need PollDetailScreen at this level because poll detail
          should be presented above the tab bar (i.e the HomeScreen) */}
        <Stack.Screen
          name={'PollDetailModal'}
          component={PollDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={'PhoningSessionModal'}
          component={PhoningSessionModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={'ProfileModal'}
          component={ProfileModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={'DoorToDoorTunnelModal'}
          component={DoorToDoorTunnelModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={'NewsDetailModal'}
          component={NewsDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="EventsFilterModal"
          component={EventsFilterModalNavigator}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
