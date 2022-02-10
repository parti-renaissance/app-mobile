import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacing } from '../../styles'
import { NewsRowViewModel } from './NewsRowViewModel'
import HighlightedNewsCard from './HighlightedNewsCard'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: () => void
}>

const HighlightedNewsRow: FunctionComponent<Props> = (props) => {
  return (
    <View style={styles.container}>
      <HighlightedNewsCard {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
})

export default HighlightedNewsRow
