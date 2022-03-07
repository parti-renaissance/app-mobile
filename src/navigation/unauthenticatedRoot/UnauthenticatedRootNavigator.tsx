import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import ForgottenPasswordScreen from '../../screens/authentication/ForgottenPasswordScreen'
import { UnauthenticatedRootNavigatorParamList } from './UnauthenticatedRootNavigatorParamList'
import { LocationPickerModalNavigator } from '../locationPickerModal/LocationPickerModalNavigator'
import { OnboardingNavigator } from '../onboarding/OnboardingNavigator'
import { headerBlank } from '../../styles/navigationAppearance'

const Stack = createStackNavigator<UnauthenticatedRootNavigatorParamList>()

export const UnauthenticatedRootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name={'OnboardingNavigator'}
          component={OnboardingNavigator}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={'ForgottenPassword'}
          component={ForgottenPasswordScreen}
          options={{ ...headerBlank, headerShown: true }}
        />
        <Stack.Screen
          name="LocationPickerModal"
          component={LocationPickerModalNavigator}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
