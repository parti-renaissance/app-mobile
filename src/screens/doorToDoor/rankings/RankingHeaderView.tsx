import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { Tab } from './Ranking'

type Props = Readonly<{
  tab: Tab
}>

export const RankingHeaderView = ({ tab }: Props) => (
  <View style={styles.row}>
    <Text style={[styles.cell, styles.cellSmall]}>
      {i18n.t('doorToDoor.ranking.rows.rang')}
    </Text>
    <Text style={[styles.cell, styles.cellSmall]}>
      {tab === Tab.INDIVIDUAL
        ? i18n.t('doorToDoor.ranking.rows.militant')
        : i18n.t('doorToDoor.ranking.rows.department')}
    </Text>
    <Text style={[styles.cell, styles.cellSmall]}>
      {i18n.t('doorToDoor.ranking.rows.doorKnocked')}
    </Text>
    <Text style={[styles.cell, styles.cellLarge]}>
      {i18n.t('doorToDoor.ranking.rows.pollsCompleted')}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  cell: {
    ...Typography.lightCaption1,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  cellSmall: {
    flex: 1,
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
