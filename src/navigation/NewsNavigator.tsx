import React, { FunctionComponent } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import NewsScreen from '../screens/news/NewsScreen'
import { TabBarNavigatorScreenProps } from './TabBarNavigator'
import { CompositeScreenProps } from '@react-navigation/native'

export type NewsNavigatorParamList = {
  News: undefined
}

export type NewsNavigatorScreenProps<
  T extends keyof NewsNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<NewsNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>

const Stack = createStackNavigator<NewsNavigatorParamList>()

const NewsNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'News'} component={NewsScreen} />
    </Stack.Navigator>
  )
}

export default NewsNavigator
