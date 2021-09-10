import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerOptions } from '../../styles/navigationAppearance'
import { PhonePollDetailScreenProps, Screen } from '../../navigation'
import PhonePollDetailScreen from './PhonePollDetailScreen'

const Stack = createStackNavigator()

const PhonePollDetailModal: FunctionComponent<PhonePollDetailScreenProps> = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Screen.phonePollDetail}
        component={PhonePollDetailScreen}
        options={{ headerLeft: () => null, title: '' }}
      />
      {/* <Stack.Screen
        name={Screen.pollDetailSuccess}
        component={PollDetailSuccessScreen}
        options={{ headerLeft: () => null, title: '' }}
      /> */}
    </Stack.Navigator>
  )
}

export default PhonePollDetailModal
