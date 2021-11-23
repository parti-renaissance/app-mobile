import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import DoorToDoorScreen from './DoorToDoorScreen'
import BuildingDetailScreen from '../buildingDetail/BuildingDetailScreen'

const DoorToDoorStack = createStackNavigator()

const DoorToDoorNavigator: FunctionComponent = () => (
  <DoorToDoorStack.Navigator screenOptions={headerBlank}>
    <DoorToDoorStack.Screen
      name={Screen.events}
      component={DoorToDoorScreen}
      options={{ headerShown: false }}
    />
    <DoorToDoorStack.Screen
      name={Screen.buildingDetail}
      component={BuildingDetailScreen}
      options={{ headerShown: false }}
    />
  </DoorToDoorStack.Navigator>
)

export default DoorToDoorNavigator
