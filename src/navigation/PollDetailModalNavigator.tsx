import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Screen } from '.'
import PollDetailScreen from '../screens/pollDetail/PollDetailScreen'
import PollDetailSuccessScreen from '../screens/pollDetail/PollDetailSuccessScreen'
import { headerOptions } from '../styles/navigationAppearance'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'
import { CompositeScreenProps } from '@react-navigation/native'

export type PollDetailModalNavigatorParamList = {
  PollDetail: { pollId: number }
  PollDetailSuccess: { pollId: number; title: string }
}

export type PollDetailModalNavigatorScreenProps<
  T extends keyof PollDetailModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<PollDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator()

const PollDetailModalNavigator: FunctionComponent = () => {
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

export default PollDetailModalNavigator
