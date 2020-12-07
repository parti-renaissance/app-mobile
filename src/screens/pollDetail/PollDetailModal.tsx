import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { PollDetailScreenProps, Screen } from '../../navigation'
import PollDetailScreen from './PollDetailScreen'
import PollDetailSuccessScreen from './PollDetailSuccessScreen'
import { headerOptions } from '../../styles/navigationAppearance'

const Stack = createStackNavigator()

const PollDetailModal: FunctionComponent<PollDetailScreenProps> = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.pollDetail}
        component={PollDetailScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      <Stack.Screen
        name={Screen.pollDetailSuccess}
        component={PollDetailSuccessScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
    </Stack.Navigator>
  )
}

export default PollDetailModal
