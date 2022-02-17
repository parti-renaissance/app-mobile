import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import NewsDetailScreen from '../screens/newsDetail/NewsDetailScreen'
import { headerBlank } from '../styles/navigationAppearance'
import { AuthenticatedRootNavigatorScreenProps } from './AuthenticatedRootNavigator'
import { CompositeScreenProps } from '@react-navigation/native'

export type NewsDetailModalNavigatorParamList = {
  NewsDetail: { newsId: string }
}

export type NewsDetailModalNavigatorScreenProps<
  T extends keyof NewsDetailModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<NewsDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>

const Stack = createStackNavigator<NewsDetailModalNavigatorParamList>()

const NewsDetailModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={'NewsDetail'} component={NewsDetailScreen} />
    </Stack.Navigator>
  )
}

export default NewsDetailModalNavigator
