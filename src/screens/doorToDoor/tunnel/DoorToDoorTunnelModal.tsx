import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerOptions } from '../../../styles/navigationAppearance'
import { Screen } from '../../../navigation'
import TunnelDoorInterlocutorScreen from './interlocutor/TunnelDoorInterlocutorScreen'
import TunnelDoorPollScreen from './survey/TunnelDoorPollScreen'
import DoorToDoorBriefScreen from './brief/DoorToDoorBriefScreen'
import TunnelDoorSelectionScreen from './doorSelection/TunnelDoorSelectionScreen'
import TunnelDoorOpeningScreen from './opening/TunnelDoorOpeningScreen'
import DoorToDoorTunnelSuccessScreen from './DoorToDoorTunnelSuccessScreen'
import i18n from '../../../utils/i18n'

const Stack = createStackNavigator()

const DoorToDoorTunnelModal: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.tunnelDoorBrief}
        component={DoorToDoorBriefScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name={Screen.tunnelDoorSelectionScreen}
        component={TunnelDoorSelectionScreen}
        options={{ headerBackTitleVisible: false, title: '' }}
      />
      <Stack.Screen
        name={Screen.tunnelDoorOpening}
        component={TunnelDoorOpeningScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Screen.tunnelDoorInterlocutor}
        component={TunnelDoorInterlocutorScreen}
      />
      <Stack.Screen
        name={Screen.tunnelDoorPoll}
        component={TunnelDoorPollScreen}
      />
      <Stack.Screen
        name={Screen.tunnelDoorSuccess}
        component={DoorToDoorTunnelSuccessScreen}
        options={{
          title: i18n.t('doorToDoor.tunnel.success.wellDone'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default DoorToDoorTunnelModal
