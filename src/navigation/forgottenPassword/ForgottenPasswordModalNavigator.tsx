import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerBlank } from '../../styles/navigationAppearance'
import { ForgottenPasswordModalNavigatorParamList } from './ForgottenPasswordModalNavigatorParamList'
import ForgottenPasswordScreen from '../../screens/authentication/ForgottenPasswordScreen'

const Stack = createStackNavigator<ForgottenPasswordModalNavigatorParamList>()

export const ForgottenPasswordModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'ForgottenPassword'}
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  )
}
