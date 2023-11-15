import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PersonalInformationScreen from '../../screens/personalInformation/PersonalInformationScreen'
import { headerBlank } from '../../styles/navigationAppearance'
import { PersonalInformationModalNavigatorParamList } from './PersonalInformationModalNavigatorParamList'

const Stack = createStackNavigator<PersonalInformationModalNavigatorParamList>()

export const PersonalInformationModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'PersonalInformation'}
        component={PersonalInformationScreen}
      />
    </Stack.Navigator>
  )
}
