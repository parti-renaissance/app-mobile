import React from 'react'
import { FunctionComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Spacing } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'

export interface PhoningScoreboardRowViewModel {
  id: string
  name: string
  calls: string
  surveys: string
  position: number
  caller: boolean
}

type Props = Readonly<{
  viewModel: PhoningScoreboardRowViewModel
}>

export const PhoningCampaignRankingRow: FunctionComponent<Props> = ({
  viewModel,
}) => {
  const styles = useThemedStyles(styleFactory)
  const rowStyle =
    viewModel.position % 2 === 0
      ? [styles.row, styles.rowEven]
      : [styles.row, styles.rowOdd]
  const callerStyle = viewModel.caller ? styles.highlightedText : undefined
  return (
    <View style={rowStyle}>
      <Text style={[styles.cellLarge, callerStyle]}>{viewModel.name}</Text>
      <Text style={[styles.cell, callerStyle]}>{viewModel.calls}</Text>
      <Text style={[styles.cell, callerStyle]}>{viewModel.surveys}</Text>
    </View>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
    cell: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
    },
    cellLarge: {
      flex: 2,
    },
    highlightedText: {
      fontWeight: 'bold',
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
