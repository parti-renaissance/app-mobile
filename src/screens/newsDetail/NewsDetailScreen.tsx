import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { NewsDetailScreenProps } from '../../navigation'
import { Colors } from '../../styles'
import { useNewsDetailScreen } from './useNewsDetailScreen.hook'

const NewsDetailScreen: FunctionComponent<NewsDetailScreenProps> = ({
  route,
}) => {
  console.log('--> route news id', route.params)

  useNewsDetailScreen()

  return (
    <SafeAreaView style={styles.container}>
      <Text>TODO</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default NewsDetailScreen
