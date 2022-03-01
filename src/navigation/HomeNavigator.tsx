import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import HomeScreen from '../screens/home/HomeScreen'
import { headerBlank } from '../styles/navigationAppearance'
import RegionScreen from '../screens/regions/RegionScreen'
import NewsScreen from '../screens/news/NewsScreen'
import EventDetailsScreen from '../screens/eventDetail/EventDetailsScreen'
import RetaliationDetailScreen from '../screens/retaliation/RetaliationDetailScreen'
import { CompositeScreenProps } from '@react-navigation/native'
import { TabBarNavigatorScreenProps } from './TabBarNavigator'
import { DoorToDoorAddress } from '../core/entities/DoorToDoor'
import DoorToDoorScreen from '../screens/doorToDoor/DoorToDoorScreen'
import BuildingDetailScreen from '../screens/buildingDetail/BuildingDetailScreen'

export type HomeNavigatorParamList = {
  Home: undefined
  Region: { zipCode: string }
  News: undefined
  EventDetails: { eventId: string }
  RetaliationDetail: { retaliationId: string }
  DoorToDoor: undefined
  BuildingDetail: { address: DoorToDoorAddress }
}

export type HomeNavigatorScreenProps<
  T extends keyof HomeNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<HomeNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>

const Stack = createStackNavigator<HomeNavigatorParamList>()

const HomeNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name={'Region'}
        component={RegionScreen}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen name={'News'} component={NewsScreen} />
      <Stack.Screen name={'EventDetails'} component={EventDetailsScreen} />
      <Stack.Screen
        name={'RetaliationDetail'}
        component={RetaliationDetailScreen}
      />
      {/* DoorToDoor */}
      <Stack.Screen
        name={'DoorToDoor'}
        component={DoorToDoorScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={'BuildingDetail'}
        component={BuildingDetailScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator
