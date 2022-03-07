import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerBlank } from '../../styles/navigationAppearance'
import { LocationPickerModalNavigatorParamList } from './LocationPickerModalNavigatorParamList'
import { LocationPickerScreen } from '../../screens/locationPicker/LocationPickerScreen'

const Stack = createStackNavigator<LocationPickerModalNavigatorParamList>()

export const LocationPickerModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'LocationPicker'} component={LocationPickerScreen} />
    </Stack.Navigator>
  )
}
