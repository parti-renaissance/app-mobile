import React, { FunctionComponent } from 'react'
import TunnelDoorPollScreen from '@/screens/doorToDoor/tunnel/survey/TunnelDoorPollScreen'
import TunnelDoorSuccessScreen from '@/screens/doorToDoor/tunnel/TunnelDoorSuccessScreen'
import { headerBlank } from '@/styles/navigationAppearance'
import i18n from '@/utils/i18n'
import { Stack } from 'expo-router'

const DoorToDoorTunnelModalNavigator: FunctionComponent = () => {
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="brief" />
      <Stack.Screen
        name={'selection'}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={'interlocutor'}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={'opening'}
        options={{ headerBackTitleVisible: false }}
      />
      {/*r
      <Stack.Screen name={'TunnelDoorPoll'} component={TunnelDoorPollScreen} />
      <Stack.Screen
        name={'TunnelDoorSuccess'}
        component={TunnelDoorSuccessScreen}
        options={{
          title: i18n.t('doorToDoor.tunnel.success.wellDone'),
          headerBackTitleVisible: false,
        }}
      /> */}
    </Stack>
  )
}

export default DoorToDoorTunnelModalNavigator
