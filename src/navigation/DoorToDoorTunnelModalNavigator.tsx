import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { headerOptions } from '../styles/navigationAppearance'
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
  TunnelDoorInterlocutor: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorPoll: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorBrief: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorSelection: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorOpening: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSuccess: {
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
        name={'TunnelDoorBrief'}
        component={DoorToDoorBriefScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name={'TunnelDoorSelection'}
        component={TunnelDoorSelectionScreen}
        options={{ headerBackTitleVisible: false, title: '' }}
      />
      <Stack.Screen
        name={'TunnelDoorOpening'}
        component={TunnelDoorOpeningScreen}
        options={{
          title: '',
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
