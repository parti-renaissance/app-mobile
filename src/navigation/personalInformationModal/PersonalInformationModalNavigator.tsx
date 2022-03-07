import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { headerBlank } from '../../styles/navigationAppearance'
import PersonalInformationScreen from '../../screens/personalInformation/PersonalInformationScreen'
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
