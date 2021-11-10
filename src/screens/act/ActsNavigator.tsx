import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import ActScreen from './ActScreen'
import PollsScreen from '../polls/PollsScreen'

const ActsStack = createStackNavigator()

const ActsNavigator: FunctionComponent = () => {
  return (
    <ActsStack.Navigator screenOptions={headerBlank}>
      <ActsStack.Screen
        name={Screen.acts}
        component={ActScreen}
        options={{ headerShown: false }}
      />
      <ActsStack.Screen
        name={Screen.polls}
        component={PollsScreen}
        options={{ headerTransparent: true }}
      />
    </ActsStack.Navigator>
  )
}

export default ActsNavigator
