import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Screen } from '../../navigation'
import NewsScreen from './NewsScreen'
import i18n from '../../utils/i18n'

const NewsStack = createStackNavigator()

const NewsNavigator: FunctionComponent = () => {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen
        name={Screen.actions}
        component={NewsScreen}
        options={{
          headerShown: true,
          title: i18n.t('news.title'),
        }}
      />
    </NewsStack.Navigator>
  )
}

export default NewsNavigator
