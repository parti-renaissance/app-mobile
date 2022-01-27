import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import ActionsScreen from './ActionsScreen'
import PhoningNavigator from '../phoning/PhoningNavigator'
import DoorToDoorNavigator from '../doorToDoor/DoorToDoorNavigator'
import PollsNavigator from '../polls/PollsNavigator'

const ActionsStack = createStackNavigator()

const ActionsNavigator: FunctionComponent = () => {
  return (
    <ActionsStack.Navigator screenOptions={{ headerShown: false }}>
      <ActionsStack.Screen
        name={Screen.actions}
        component={ActionsScreen}
        options={{ headerShown: false }}
      />
      <ActionsStack.Screen
        name={Screen.pollsNavigator}
        component={PollsNavigator}
        options={{ headerTransparent: true }}
      />
      <ActionsStack.Screen
        name={Screen.phoningNavigator}
        component={PhoningNavigator}
        options={{ headerTransparent: true }}
      />
      <ActionsStack.Screen
        name={Screen.doorToDoorNavigator}
        component={DoorToDoorNavigator}
        options={{ headerTransparent: true }}
      />
    </ActionsStack.Navigator>
  )
}

export default ActionsNavigator
