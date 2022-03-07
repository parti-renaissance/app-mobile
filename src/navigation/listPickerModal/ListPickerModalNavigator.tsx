import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { headerBlank } from '../../styles/navigationAppearance'
import { ListPickerModalNavigatorParamList } from './ListPickerModalNavigatorParamList'
import { ListPickerScreen } from '../../screens/listPicker/ListPickerScreen'

const Stack = createStackNavigator<ListPickerModalNavigatorParamList>()

export const ListPickerModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'ListPicker'} component={ListPickerScreen} />
    </Stack.Navigator>
  )
}
