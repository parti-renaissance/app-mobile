import React from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing } from '../../styles'

const PhoningTutorialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoningTutorialScreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
})

export default PhoningTutorialScreen
