import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerOptions } from '../../../styles/navigationAppearance'
import { Screen } from '../../../navigation'
import TunnelDoorInterlocutorScreen from './interlocutor/TunnelDoorInterlocutorScreen'
import TunnelDoorPollScreen from './survey/TunnelDoorPollScreen'

const Stack = createStackNavigator()

const DoorToDoorTunnelModal: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.tunnelDoorInterlocutor}
        component={TunnelDoorInterlocutorScreen}
      />
      <Stack.Screen
        name={Screen.tunnelDoorPoll}
        component={TunnelDoorPollScreen}
      />
    </Stack.Navigator>
  )
}

export default DoorToDoorTunnelModal
