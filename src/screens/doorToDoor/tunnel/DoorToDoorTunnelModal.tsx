import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerOptions } from '../../../styles/navigationAppearance'
import { Screen } from '../../../navigation'
import TunnelDoorInterlocutorScreen from './TunnelDoorInterlocutorScreen'

const Stack = createStackNavigator()

const DoorToDoorTunnelModal: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.tunnelDoorInterlocutor}
        component={TunnelDoorInterlocutorScreen}
      />
    </Stack.Navigator>
  )
}

export default DoorToDoorTunnelModal
