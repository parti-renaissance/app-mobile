import React, { FunctionComponent, useEffect } from 'react'
import { headerBlank } from '@/styles/navigationAppearance'
import i18n from '@/utils/i18n'
import { Stack, useNavigation, useRootNavigationState } from 'expo-router'

const DoorToDoorTunnelModalNavigator: FunctionComponent = () => {
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen name="brief" />
      <Stack.Screen name={'selection'} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={'interlocutor'} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={'opening'} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={'poll'} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen
        name={'success'}
        options={{
          headerBackTitleVisible: false,
          title: i18n.t('doorToDoor.tunnel.success.wellDone'),
        }}
      />
    </Stack>
  )
}

export default DoorToDoorTunnelModalNavigator
