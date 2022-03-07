import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerBlank } from '../../styles/navigationAppearance'
import TunnelDoorInterlocutorScreen from '../../screens/doorToDoor/tunnel/interlocutor/TunnelDoorInterlocutorScreen'
import TunnelDoorPollScreen from '../../screens/doorToDoor/tunnel/survey/TunnelDoorPollScreen'
import DoorToDoorBriefScreen from '../../screens/doorToDoor/tunnel/brief/DoorToDoorBriefScreen'
import TunnelDoorSelectionScreen from '../../screens/doorToDoor/tunnel/doorSelection/TunnelDoorSelectionScreen'
import TunnelDoorOpeningScreen from '../../screens/doorToDoor/tunnel/opening/TunnelDoorOpeningScreen'
import TunnelDoorSuccessScreen from '../../screens/doorToDoor/tunnel/TunnelDoorSuccessScreen'
import i18n from '../../utils/i18n'
import { DoorToDoorTunnelModalNavigatorParamList } from './DoorToDoorTunnelModalNavigatorParamList'

const Stack = createStackNavigator<DoorToDoorTunnelModalNavigatorParamList>()

const DoorToDoorTunnelModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'TunnelDoorBrief'}
        component={DoorToDoorBriefScreen}
      />
      <Stack.Screen
        name={'TunnelDoorSelection'}
        component={TunnelDoorSelectionScreen}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={'TunnelDoorOpening'}
        component={TunnelDoorOpeningScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={'TunnelDoorInterlocutor'}
        component={TunnelDoorInterlocutorScreen}
      />
      <Stack.Screen name={'TunnelDoorPoll'} component={TunnelDoorPollScreen} />
      <Stack.Screen
        name={'TunnelDoorSuccess'}
        component={TunnelDoorSuccessScreen}
        options={{
          title: i18n.t('doorToDoor.tunnel.success.wellDone'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default DoorToDoorTunnelModalNavigator
