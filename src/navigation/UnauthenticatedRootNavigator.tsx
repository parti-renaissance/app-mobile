import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import LoginScreen from '../screens/authentication/LoginScreen'
import UnauthenticatedHomeScreen from '../screens/authentication/UnauthenticatedHomeScreen'
import { headerBlank } from '../styles/navigationAppearance'
import ForgottenPasswordScreen from '../screens/authentication/ForgottenPasswordScreen'
import SignUpScreen from '../screens/authentication/SignUpScreen'

export type UnauthenticatedRootNavigatorParamList = {
  UnauthenticatedHome: undefined
  Login: undefined
  ForgottenPassword: { email?: string }
  SignUp: undefined
}

export type UnauthenticatedRootNavigatorScreenProps<
  T extends keyof UnauthenticatedRootNavigatorParamList
> = StackScreenProps<UnauthenticatedRootNavigatorParamList, T>

const Stack = createStackNavigator<UnauthenticatedRootNavigatorParamList>()

export const UnauthenticatedRootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Group>
        <Stack.Screen
          name={'UnauthenticatedHome'}
          component={UnauthenticatedHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'SignUp'} component={SignUpScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={'ForgottenPassword'}
          component={ForgottenPasswordScreen}
          options={{ headerShown: true }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
