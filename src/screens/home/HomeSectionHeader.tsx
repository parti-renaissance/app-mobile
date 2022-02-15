import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  title: string
  isHighlighted: boolean
}>

// TODO: (Pierre Felgines) 2022/02/11 Refactor this with NewsSectionHeader
const HomeSectionHeader: FunctionComponent<Props> = ({
  title,
  isHighlighted,
}) => {
  return (
    <View
      style={[styles.container, isHighlighted && styles.highlightedContainer]}
    >
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
  highlightedContainer: {
    backgroundColor: Colors.highlightedNewsBackground,
  },
  text: {
    ...Typography.title2,
    color: Colors.darkText,
  },
})

export default HomeSectionHeader
