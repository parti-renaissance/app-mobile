import { NavigatorScreenParams } from '@react-navigation/native'
import { ActionsNavigatorParamList } from '../actions/ActionsNavigatorParamList'
import { EventNavigatorParamList } from '../event/EventNavigatorParamList'
import { HomeNavigatorParamList } from '../home/HomeNavigatorParamList'
import { NewsNavigatorParamList } from '../news/NewsNavigatorParamList'

export type TabBarNavigatorParamList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParamList>
  NewsNavigator: NavigatorScreenParams<NewsNavigatorParamList>
  ActionsNavigator: NavigatorScreenParams<ActionsNavigatorParamList>
  Tools: undefined
  EventNavigator: NavigatorScreenParams<EventNavigatorParamList>
}
