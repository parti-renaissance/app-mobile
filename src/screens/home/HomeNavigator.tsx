import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import HomeScreen from './HomeScreen'
import { HomeParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import RegionScreen from '../regions/RegionScreen'
import NewsScreen from '../news/NewsScreen'
import EventDetailsScreen from '../eventDetail/EventDetailsScreen'
import RetaliationDetailScreen from '../retaliation/RetaliationDetailScreen'

const HomeStack = createStackNavigator<HomeParamList>()

const HomeNavigator: FunctionComponent = () => {
  return (
    <HomeStack.Navigator screenOptions={headerBlank}>
      <HomeStack.Screen
        name={Screen.home}
        component={HomeScreen}
        options={{ headerTransparent: true }}
      />
      <HomeStack.Screen
        name={Screen.region}
        component={RegionScreen}
        options={{ headerTransparent: true }}
      />

      <HomeStack.Screen name={Screen.news} component={NewsScreen} />

      <HomeStack.Screen
        name={Screen.eventDetails}
        component={EventDetailsScreen}
      />

      <HomeStack.Screen
        name={Screen.retaliationDetailScreen}
        component={RetaliationDetailScreen}
      />
    </HomeStack.Navigator>
  )
}

export default HomeNavigator
