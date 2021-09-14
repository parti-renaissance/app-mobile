import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { DataTable } from 'react-native-paper'
import { PhoningCampaignScore } from '../../core/entities/PhoningCampaign'
import { Colors } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  scores: Array<PhoningCampaignScore>
}>

const PhoningCampaignRankingView: FunctionComponent<Props> = ({
  style,
  scores,
}) => {
  const styles = useThemedStyles(styleFactory)

  const items = scores.map((score) => {
    const key = `${score.position}_${score.firstName}_${score.score}`
    const rowStyle =
      score.position % 2 === 0
        ? [styles.row, styles.rowEven]
        : [styles.row, styles.rowOdd]
    return (
      <DataTable.Row key={key} style={rowStyle}>
        <DataTable.Cell style={styles.cellLarge}>
          {i18n.t('phoning.scoreboard.name', {
            position: score.position,
            name: score.firstName,
          })}
        </DataTable.Cell>
        <DataTable.Cell numeric style={styles.cell}>
          {score.score}
        </DataTable.Cell>
        <DataTable.Cell numeric style={styles.cell}>
          {score.position}
        </DataTable.Cell>
      </DataTable.Row>
    )
  })

  return (
    <DataTable style={style}>
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={[styles.cellLarge]}>
          {i18n.t('phoning.scoreboard.header_name')}
        </DataTable.Title>
        <DataTable.Title numeric style={styles.cell}>
          {i18n.t('phoning.scoreboard.header_calls')}
        </DataTable.Title>
        <DataTable.Title numeric style={styles.cell}>
          {i18n.t('phoning.scoreboard.header_calls_completed')}
        </DataTable.Title>
      </DataTable.Header>
      {items}
    </DataTable>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
    cell: {
      flex: 1,
      justifyContent: 'center',
    },
    cellLarge: {
      flex: 2,
    },
    header: {
      borderBottomWidth: 0,
    },
    row: {
      borderBottomWidth: 0,
    },
    rowEven: {
      backgroundColor: Colors.defaultBackground,
    },
    rowOdd: {
      backgroundColor: theme.lightBackground,
    },
  })
}

export default PhoningCampaignRankingView
