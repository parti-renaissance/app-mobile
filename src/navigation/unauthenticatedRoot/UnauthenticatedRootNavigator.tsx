import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import { UnauthenticatedRootNavigatorParamList } from './UnauthenticatedRootNavigatorParamList'
import { LocationPickerModalNavigator } from '../locationPickerModal/LocationPickerModalNavigator'
import { OnboardingNavigator } from '../onboarding/OnboardingNavigator'
import { ForgottenPasswordModalNavigator } from '../forgottenPassword/ForgottenPasswordModalNavigator'

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
          name={'ForgottenPasswordModal'}
          component={ForgottenPasswordModalNavigator}
          options={{ gestureEnabled: false }}
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
