import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import ActionsScreen from './ActionsScreen'
import PollsScreen from '../polls/PollsScreen'
import PhoningNavigator from '../phoning/PhoningNavigator'

const ActionsStack = createStackNavigator()

const ActionsNavigator: FunctionComponent = () => {
  return (
    <ActionsStack.Navigator screenOptions={headerBlank}>
      <ActionsStack.Screen
        name={Screen.actions}
        component={ActionsScreen}
        options={{ headerShown: false }}
      />
      <ActionsStack.Screen
        name={Screen.polls}
        component={PollsScreen}
        options={{ headerTransparent: true }}
      />
      <ActionsStack.Screen
        name={Screen.phoning}
        component={PhoningNavigator}
        options={{ headerTransparent: true }}
      />
    </ActionsStack.Navigator>
  )
}

export default ActionsNavigator
