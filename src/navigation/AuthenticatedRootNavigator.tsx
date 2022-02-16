import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import {
  DoorToDoorTunnelModalParamList,
  NewsDetailModalParamList,
  PhoningSessionModalParamList,
  PollDetailModalParamList,
  ProfileParamList,
  Screen,
} from '.'
import PollDetailModal from '../screens/pollDetail/PollDetailModal'
import ProfileModal from '../screens/profile/ProfileModal'
import PhoningSessionModal from '../screens/phoningSessionNavigator/PhoningSessionModal'
import DoorToDoorTunnelModal from '../screens/doorToDoor/tunnel/DoorToDoorTunnelModal'
import NewsDetailModal from '../screens/newsDetail/NewsDetailModal'
import { TabBarNavigator, TabBarNavigatorParamList } from './TabBarNavigator'
import { NavigatorScreenParams } from '@react-navigation/native'

export type AuthenticatedRootNavigatorParamList = {
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalParamList>
  PhoningSessionModal: NavigatorScreenParams<PhoningSessionModalParamList>
  ProfileModal: undefined
  Login: NavigatorScreenParams<ProfileParamList>
  TermsOfUse: undefined
  News: undefined
  DoorToDoorTunnelModal: NavigatorScreenParams<DoorToDoorTunnelModalParamList>
  NewsDetailModal: NavigatorScreenParams<NewsDetailModalParamList>
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
          component={PollDetailModal}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.phoningSessionModal}
          component={PhoningSessionModal}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.profileModal}
          component={ProfileModal}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.doorToDoorTunnelModal}
          component={DoorToDoorTunnelModal}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={Screen.newsDetailModal}
          component={NewsDetailModal}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
