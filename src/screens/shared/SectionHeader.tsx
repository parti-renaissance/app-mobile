import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

export type SectionHeaderProps = Readonly<{
  title: string
  isHighlighted: boolean
  style?: StyleProp<ViewStyle>
}>

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  title,
  isHighlighted,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        isHighlighted && styles.highlightedContainer,
        style,
      ]}
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
