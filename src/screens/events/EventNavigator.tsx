import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EventParamList, Screen } from '../../navigation'
import EventDetailsScreen from './EventDetailsScreen'
import { headerBlank } from '../../styles/navigationAppearance'
import EventsScreen from './EventsScreen'

const EventStack = createStackNavigator<EventParamList>()

const EventNavigator: FunctionComponent = () => {
  return (
    <EventStack.Navigator screenOptions={headerBlank}>
      <EventStack.Screen
        name={Screen.events}
        component={EventsScreen}
        options={{ headerShown: false }}
      />
      <EventStack.Screen
        name={Screen.eventDetails}
        component={EventDetailsScreen}
      />
    </EventStack.Navigator>
  )
}

export default EventNavigator
