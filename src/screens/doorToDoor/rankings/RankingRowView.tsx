import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Spacing } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import { RankingRowViewModel } from './Ranking'

type Props = Readonly<{
  viewModel: RankingRowViewModel
}>

export const RankingRowView = ({ viewModel }: Props) => {
  const styles = useThemedStyles(styleFactory)
  const rowStyle =
    viewModel.position % 2 === 0
      ? [styles.row, styles.rowEven]
      : [styles.row, styles.rowOdd]

  return (
    <View style={rowStyle}>
      <Text style={styles.cell}>{viewModel.rank}</Text>
      <Text style={styles.cellLarge}>{viewModel.name}</Text>
      <Text style={styles.cell}>{viewModel.doorKnocked}</Text>
      <Text style={styles.cellLarge}>{viewModel.pollsCompleted}</Text>
    </View>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
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
      paddingStart: Spacing.margin,
      paddingVertical: Spacing.margin,
    },
    rowEven: {
      backgroundColor: Colors.defaultBackground,
    },
    rowOdd: {
      backgroundColor: theme.lightBackground,
    },
  })
}
