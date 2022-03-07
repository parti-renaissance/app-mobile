import { HomeNavigatorParamList } from '../home/HomeNavigatorParamList'
import { EventNavigatorParamList } from '../event/EventNavigatorParamList'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NewsNavigatorParamList } from '../news/NewsNavigatorParamList'
import { ActionsNavigatorParamList } from '../actions/ActionsNavigatorParamList'

export type TabBarNavigatorParamList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParamList>
  NewsNavigator: NavigatorScreenParams<NewsNavigatorParamList>
  ActionsNavigator: NavigatorScreenParams<ActionsNavigatorParamList>
  Tools: undefined
  EventNavigator: NavigatorScreenParams<EventNavigatorParamList>
}
