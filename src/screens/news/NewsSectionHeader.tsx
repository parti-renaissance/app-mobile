import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  title: string
}>

const NewsSectionHeader: FunctionComponent<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.mediumMargin,
    paddingBottom: Spacing.unit,
  },
  text: {
    ...Typography.title2,
    color: Colors.darkText,
  },
})

export default NewsSectionHeader
