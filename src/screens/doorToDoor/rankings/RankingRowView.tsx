import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Spacing } from '../../../styles'
import { RankingRowViewModel } from './Ranking'

type Props = Readonly<{
  viewModel: RankingRowViewModel
}>

export const RankingRowView = ({ viewModel }: Props) => {
  const rowStyle =
    viewModel.position % 2 === 0
      ? [styles.row, styles.rowEven]
      : [styles.row, styles.rowOdd]

  const rowHighlightedStyle = viewModel.highlight ? styles.rowHighlighted : null

  return (
    <View style={[rowStyle, rowHighlightedStyle]}>
      <Text style={styles.cell}>{viewModel.rank}</Text>
      <Text style={styles.cellLarge}>{viewModel.name}</Text>
      <Text style={styles.cell}>{viewModel.doorKnocked}</Text>
      <Text style={styles.cellLarge}>{viewModel.pollsCompleted}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  cellLarge: {
    flex: 2,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: Spacing.unit,
    paddingStart: Spacing.margin,
    paddingVertical: Spacing.margin,
  },
  rowEven: {
    backgroundColor: Colors.defaultBackground,
  },
  rowHighlighted: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  rowOdd: {
    backgroundColor: Colors.lightBackground,
  },
})
