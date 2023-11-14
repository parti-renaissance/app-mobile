import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import ProgressBar from '../../shared/ProgressBar'
import { DoorToDoorCampaignCardViewModel } from '../DoorToDoorCampaignCardViewModel'

type Props = Readonly<{
  viewModel: DoorToDoorCampaignCardViewModel
}>

export const RankingCampaignHeader = ({ viewModel }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.campaignContainer}>
        <Text style={styles.campaignName}>{viewModel.name}</Text>
        <Text style={styles.statusText}>{viewModel.date}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.goal}>{i18n.t('doorToDoor.goal')}</Text>
          <Text style={styles.indicator}>
            {viewModel.goal} questionnaires remplis
          </Text>
        </View>
        <ProgressBar progress={0.3} color={Colors.accent} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  campaignContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.unit,
  },
  campaignName: {
    ...Typography.title2,
  },
  container: {
    alignContent: 'center',
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    margin: Spacing.margin,
    padding: Spacing.margin,
  },
  goal: {
    ...Typography.lightCaption1,
  },
  indicator: {
    ...Typography.lightCaption1,
  },
  statsContainer: {
    backgroundColor: Colors.defaultBackground,
    borderRadius: 8,
    padding: Spacing.margin,
  },
  statusImage: {
    paddingRight: Spacing.small,
  },
  statusText: {
    ...Typography.lightCaption1,
    marginTop: Spacing.small,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.unit,
  },
})
