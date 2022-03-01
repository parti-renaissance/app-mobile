import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import PollDetailScreen from '../screens/pollDetail/PollDetailScreen'
import PollDetailSuccessScreen from '../screens/pollDetail/PollDetailSuccessScreen'
import { headerBlank } from '../styles/navigationAppearance'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'
import { CompositeScreenProps } from '@react-navigation/native'

export type PollDetailModalNavigatorParamList = {
  PollDetail: { pollId: string }
  PollDetailSuccess: { pollId: string; title: string }
}

export type PollDetailModalNavigatorScreenProps<
  T extends keyof PollDetailModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<PollDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator<PollDetailModalNavigatorParamList>()

const PollDetailModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'PollDetail'} component={PollDetailScreen} />
      <Stack.Screen
        name={'PollDetailSuccess'}
        component={PollDetailSuccessScreen}
        options={{ headerLeft: () => null }}
      />
    </Stack.Navigator>
  )
}

export default PollDetailModalNavigator
