import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import EventDetailsScreen from '../screens/eventDetail/EventDetailsScreen'
import { headerBlank } from '../styles/navigationAppearance'
import EventsScreen from '../screens/events/EventsScreen'
import { CompositeScreenProps } from '@react-navigation/native'
import { TabBarNavigatorScreenProps } from './TabBarNavigator'
import { EventMode } from '../core/entities/Event'

export type EventNavigatorParamList = {
  Events: { eventMode?: EventMode } | undefined
  EventDetails: { eventId: string }
}

export type EventNavigatorScreenProps<
  T extends keyof EventNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<EventNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>

const Stack = createStackNavigator<EventNavigatorParamList>()

const EventNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'Events'} component={EventsScreen} />
      <Stack.Screen
        name={'EventDetails'}
        component={EventDetailsScreen}
        options={{ headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default EventNavigator
