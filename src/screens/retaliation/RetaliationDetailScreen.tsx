import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RetaliationDetailScreenProp } from '../../navigation'
import { Colors, Spacing } from '../../styles'

const RetaliationDetailScreen: FunctionComponent<RetaliationDetailScreenProp> = ({
  route,
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text>{route.params.viewModel.title}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    padding: Spacing.margin,
  },
})

export default RetaliationDetailScreen
