import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NewsParamList, Screen } from '../../navigation'
import NewsScreen from './NewsScreen'

const NewsStack = createStackNavigator<NewsParamList>()

const NewsNavigator: FunctionComponent = () => {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen name={Screen.news} component={NewsScreen} />
    </NewsStack.Navigator>
  )
}

export default NewsNavigator
