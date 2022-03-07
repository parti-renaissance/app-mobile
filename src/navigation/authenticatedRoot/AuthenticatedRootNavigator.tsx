import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import PollDetailModalNavigator from '../pollDetailModal/PollDetailModalNavigator'
import ProfileModalNavigator from '../profileModal/ProfileModalNavigator'
import PhoningSessionModalNavigator from '../phoningSessionModal/PhoningSessionModalNavigator'
import DoorToDoorTunnelModalNavigator from '../doorToDoorTunnelModal/DoorToDoorTunnelModalNavigator'
import { TabBarNavigator } from '../tabBar/TabBarNavigator'
import NewsDetailModalNavigator from '../newsDetailModal/NewsDetailModalNavigator'
import { EventsFilterModalNavigator } from '../eventsFilterModal/EventsFilterModalNavigator'
import { AuthenticatedRootNavigatorParamList } from './AuthenticatedRootNavigatorParamList'
import { LocationPickerModalNavigator } from '../locationPickerModal/LocationPickerModalNavigator'

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
        <Stack.Screen
          name="LocationPickerModal"
          component={LocationPickerModalNavigator}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
