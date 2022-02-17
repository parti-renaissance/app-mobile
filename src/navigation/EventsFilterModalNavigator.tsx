import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { headerBlank } from '../styles/navigationAppearance'
import { CompositeScreenProps } from '@react-navigation/native'
import EventQuickFilters from '../screens/events/EventQuickFiltersScreen'
import { EventMode } from '../core/entities/Event'
import { EventNavigatorParamList } from './EventNavigator'
import { TabBarNavigatorScreenProps } from './TabBarNavigator'

export type EventsFilterModalNavigatorParamList = {
  EventsFilter: { eventMode?: EventMode }
}

export type EventsFilterModalNavigatorScreenProps<
  T extends keyof EventsFilterModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<EventsFilterModalNavigatorParamList, T>,
  CompositeScreenProps<
    StackScreenProps<EventNavigatorParamList>, // we need to go from modal to Events screen
    TabBarNavigatorScreenProps
  >
>

const Stack = createStackNavigator<EventsFilterModalNavigatorParamList>()

export const EventsFilterModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'EventsFilter'} component={EventQuickFilters} />
    </Stack.Navigator>
  )
}
