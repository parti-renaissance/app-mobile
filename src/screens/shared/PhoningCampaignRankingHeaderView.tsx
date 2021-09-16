import React from 'react'
import { FunctionComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Spacing } from '../../styles'
import i18n from '../../utils/i18n'

export const PhoningCampaignRankingHeaderView: FunctionComponent = () => {
  return (
    <View style={styles.row}>
      <Text style={styles.cellLarge}>
        {i18n.t('phoning.scoreboard.header_name')}
      </Text>
      <Text style={styles.cell}>
        {i18n.t('phoning.scoreboard.header_calls')}
      </Text>
      <Text style={styles.cell}>
        {i18n.t('phoning.scoreboard.header_calls_completed')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  cellLarge: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    paddingStart: Spacing.margin,
    paddingVertical: Spacing.margin,
  },
})
