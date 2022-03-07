import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import LoginScreen from '../../screens/login/LoginScreen'
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen'
import { headerBlank } from '../../styles/navigationAppearance'
import SignUpScreen from '../../screens/signUp/SignUpScreen'
import { OnboardingNavigatorParamList } from './OnboardingNavigatorParamList'

const Stack = createStackNavigator<OnboardingNavigatorParamList>()

export const OnboardingNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'Onboarding'}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'SignUp'} component={SignUpScreen} />
    </Stack.Navigator>
  )
}
