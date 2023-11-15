import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NewsScreen from '../../screens/news/NewsScreen'
import { NewsNavigatorParamList } from './NewsNavigatorParamList'

const Stack = createStackNavigator<NewsNavigatorParamList>()

const NewsNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'News'} component={NewsScreen} />
    </Stack.Navigator>
  )
}

export default NewsNavigator
