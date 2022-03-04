import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerBlank } from '../../styles/navigationAppearance'
import EventQuickFilters from '../../screens/events/EventQuickFiltersScreen'
import { EventsFilterModalNavigatorParamList } from './EventsFilterModalNavigatorParamList'

const Stack = createStackNavigator<EventsFilterModalNavigatorParamList>()

export const EventsFilterModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'EventsFilter'} component={EventQuickFilters} />
    </Stack.Navigator>
  )
}
