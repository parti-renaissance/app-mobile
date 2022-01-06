import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { AuthenticatedHomeParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import PollsScreen from './PollsScreen'

const PollsStack = createStackNavigator<AuthenticatedHomeParamList>()

const PollsNavigator: FunctionComponent = () => (
  <PollsStack.Navigator screenOptions={headerBlank}>
    <PollsStack.Screen
      name={Screen.polls}
      component={PollsScreen}
      options={{ headerTransparent: true }}
    />
  </PollsStack.Navigator>
)

export default PollsNavigator
