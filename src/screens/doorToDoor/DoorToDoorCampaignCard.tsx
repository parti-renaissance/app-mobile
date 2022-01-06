import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'
import ProgressBar from '../shared/ProgressBar'
import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'

type Props = {
  viewModel: DoorToDoorCampaignCardViewModel
}

export const DoorToDoorCampaignCard = ({ viewModel }: Props) => {
  return (
    <CardView style={styles.card} backgroundColor={Colors.defaultBackground}>
      <View style={styles.content}>
        <View style={styles.campaign}>
          <Text style={styles.title}>{viewModel.name}</Text>
          <Text style={styles.date}>{viewModel.date}</Text>
        </View>
        <View>
          <Text style={styles.goal}>
            {i18n.t('doorToDoor.goal')}
            <Text style={styles.indicator}>{viewModel.goal}</Text>
          </Text>
          <ProgressBar progress={0.3} color={Colors.primaryColor} />
        </View>
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  campaign: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    marginHorizontal: Spacing.margin,
  },
  content: {
    flexDirection: 'row',
    padding: Spacing.margin,
  },
  date: {
    ...Typography.lightCaption1,
    marginTop: Spacing.small,
  },
  goal: {
    ...Typography.lightCaption1,
    marginBottom: Spacing.unit,
  },
  indicator: {
    ...Typography.headline,
  },
  title: {
    ...Typography.title2,
  },
})
