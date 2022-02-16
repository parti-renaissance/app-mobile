import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import { Screen } from '.'
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
          name={Screen.pollDetailModal}
          component={PollDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.phoningSessionModal}
          component={PhoningSessionModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.profileModal}
          component={ProfileModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.doorToDoorTunnelModal}
          component={DoorToDoorTunnelModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.newsDetailModal}
          component={NewsDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
