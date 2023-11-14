import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Colors, Spacing } from '../../styles'
import HighlightedNewsCard from './HighlightedNewsCard'
import { NewsRowViewModel } from './NewsRowViewModel'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: () => void
  style?: StyleProp<ViewStyle>
}>

const HighlightedNewsRow: FunctionComponent<Props> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <HighlightedNewsCard {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
    backgroundColor: Colors.highlightedNewsBackground,
  },
})

export default HighlightedNewsRow
