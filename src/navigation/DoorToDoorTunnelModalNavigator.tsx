import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { headerOptions } from '../styles/navigationAppearance'
import { Screen } from '.'
import TunnelDoorInterlocutorScreen from '../screens/doorToDoor/tunnel/interlocutor/TunnelDoorInterlocutorScreen'
import TunnelDoorPollScreen from '../screens/doorToDoor/tunnel/survey/TunnelDoorPollScreen'
import DoorToDoorBriefScreen from '../screens/doorToDoor/tunnel/brief/DoorToDoorBriefScreen'
import TunnelDoorSelectionScreen from '../screens/doorToDoor/tunnel/doorSelection/TunnelDoorSelectionScreen'
import TunnelDoorOpeningScreen from '../screens/doorToDoor/tunnel/opening/TunnelDoorOpeningScreen'
import TunnelDoorSuccessScreen from '../screens/doorToDoor/tunnel/TunnelDoorSuccessScreen'
import i18n from '../utils/i18n'
import { BuildingSelectedNavigationParams } from '../screens/doorToDoor/tunnel/BuildingSelectedNavigationParams'
import { CompositeScreenProps } from '@react-navigation/native'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'

export type DoorToDoorTunnelModalNavigatorParamList = {
  TunnelDoorInterlocutorScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorPollScreen: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorBriefScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorSelectionScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorOpeningScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSuccessScreen: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
}

export type DoorToDoorTunnelModalNavigatorScreenProps<
  T extends keyof DoorToDoorTunnelModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<DoorToDoorTunnelModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator<DoorToDoorTunnelModalNavigatorParamList>()

const DoorToDoorTunnelModalNavigator: FunctionComponent = () => {
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
