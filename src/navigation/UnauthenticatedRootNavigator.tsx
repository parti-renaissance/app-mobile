import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import AnonymousLoginZipCodeScreen from '../screens/authentication/AnonymousLoginZipCodeScreen'
import LoginScreen from '../screens/authentication/LoginScreen'
import TermsOfUseScreen from '../screens/authentication/TermsOfUseScreen'
import UnauthenticatedHomeScreen from '../screens/authentication/UnauthenticatedHomeScreen'
import ZipCodeConfirmationScreen from '../screens/authentication/ZipCodeConfirmation'
import { headerBlank } from '../styles/navigationAppearance'
import DataCollectScreen from '../screens/authentication/DataCollectScreen'
import ForgottenPasswordScreen from '../screens/authentication/ForgottenPasswordScreen'
import SignUpScreen from '../screens/authentication/SignUpScreen'

export type UnauthenticatedRootNavigatorParamList = {
  UnauthenticatedHome: undefined
  Login: undefined
  ForgottenPassword: { email?: string }
  SignUp: undefined
  AnonymousLoginZipCode: undefined
  ZipCodeConfirmation: { zipCode: string }
  DataCollect: undefined
  TermsOfUse: undefined
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
        <Stack.Screen
          name={'AnonymousLoginZipCode'}
          component={AnonymousLoginZipCodeScreen}
        />
        <Stack.Screen
          name={'ZipCodeConfirmation'}
          component={ZipCodeConfirmationScreen}
        />
        <Stack.Screen name={'DataCollect'} component={DataCollectScreen} />
        <Stack.Screen name={'TermsOfUse'} component={TermsOfUseScreen} />
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
