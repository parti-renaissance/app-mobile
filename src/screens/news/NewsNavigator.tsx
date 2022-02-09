import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import NewsScreen from './NewsScreen'

const NewsStack = createStackNavigator()

const NewsNavigator: FunctionComponent = () => {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen name={Screen.actions} component={NewsScreen} />
    </NewsStack.Navigator>
  )
}

export default NewsNavigator
