import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  NewsDetailModalParamList,
  NewsDetailModalProps,
  Screen,
} from '../../navigation'
import NewsDetailScreen from './NewsDetailScreen'
import { headerBlank } from '../../styles/navigationAppearance'

const NewsDetailModalStack = createStackNavigator<NewsDetailModalParamList>()

const NewsDetailModal: FunctionComponent<NewsDetailModalProps> = () => {
  return (
    <NewsDetailModalStack.Navigator screenOptions={headerBlank}>
      <NewsDetailModalStack.Screen
        name={Screen.newsDetail}
        component={NewsDetailScreen}
      />
    </NewsDetailModalStack.Navigator>
  )
}

export default NewsDetailModal
