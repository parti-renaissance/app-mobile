import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EventDetailsScreen from '../../screens/eventDetail/EventDetailsScreen'
import EventsScreen from '../../screens/events/EventsScreen'
import { headerBlank } from '../../styles/navigationAppearance'
import { EventNavigatorParamList } from './EventNavigatorParamList'

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
