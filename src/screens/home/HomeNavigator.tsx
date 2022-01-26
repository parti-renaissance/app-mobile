import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FunctionComponent } from 'react'
import HomeScreen from './HomeScreen'
import { HomeParamList, Screen } from '../../navigation'
import { headerBlank } from '../../styles/navigationAppearance'
import RegionScreen from '../regions/RegionScreen'
import NewsScreen from '../news/NewsScreen'
import i18n from '../../utils/i18n'
import EventDetailsScreen from '../events/EventDetailsScreen'
import RetaliationDetailScreen from '../retaliation/RetaliationDetailScreen'
import PollsScreen from '../polls/PollsScreen'

const HomeStack = createStackNavigator<HomeParamList>()

const HomeNavigator: FunctionComponent = () => {
  return (
    <HomeStack.Navigator screenOptions={headerBlank}>
      <HomeStack.Screen name={Screen.home} component={HomeScreen} />
      <HomeStack.Screen
        name={Screen.region}
        component={RegionScreen}
        options={{ headerTransparent: true }}
      />

      <HomeStack.Screen
        name={Screen.news}
        component={NewsScreen}
        options={() => {
          return {
            title: i18n.t('news.title'),
          }
        }}
      />

      <HomeStack.Screen
        name={Screen.eventDetails}
        component={EventDetailsScreen}
      />

      <HomeStack.Screen
        name={Screen.retaliationDetailScreen}
        component={RetaliationDetailScreen}
      />

      <HomeStack.Screen
        name={Screen.pollsNavigator}
        component={PollsScreen}
        options={{ headerTransparent: true }}
      />
    </HomeStack.Navigator>
  )
}

export default HomeNavigator
