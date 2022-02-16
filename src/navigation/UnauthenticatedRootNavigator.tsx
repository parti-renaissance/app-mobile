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
import { Screen } from '.'

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

export type UnauthenticatedRootNavigatorScreenProps = StackScreenProps<UnauthenticatedRootNavigatorParamList>

const Stack = createStackNavigator()

export const UnauthenticatedRootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Group>
        <Stack.Screen
          name={Screen.unauthenticatedHome}
          component={UnauthenticatedHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={Screen.login} component={LoginScreen} />
        <Stack.Screen
          name={Screen.anonymousLoginZipCode}
          component={AnonymousLoginZipCodeScreen}
        />
        <Stack.Screen
          name={Screen.zipCodeConfirmation}
          component={ZipCodeConfirmationScreen}
        />
        <Stack.Screen name={Screen.dataCollect} component={DataCollectScreen} />
        <Stack.Screen name={Screen.termsOfUse} component={TermsOfUseScreen} />
        <Stack.Screen name={Screen.signUp} component={SignUpScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={Screen.forgottenPassword}
          component={ForgottenPasswordScreen}
          options={{ headerShown: true }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
