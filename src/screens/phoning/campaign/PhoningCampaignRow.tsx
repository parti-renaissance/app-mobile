import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography, Colors } from '../../../styles'
import CardView from '../../shared/CardView'
import { useTheme } from '../../../themes'
import ProgressBar from '../../shared/ProgressBar'
import { PrimaryButton } from '../../shared/Buttons'
import i18n from '../../../utils/i18n'

type Props = Readonly<{
  viewModel: PhoningCampaignRowViewModel
  onCallButtonPressed: () => void
}>

export interface PhoningCampaignRowViewModel {
  id: string
  title: string
  brief: string
  calledCount: number
  numberOfPersonToCall: number
}

const PhoningCampaignRow: FunctionComponent<Props> = ({
  viewModel,
  onCallButtonPressed,
}) => {
  const { theme } = useTheme()
  return (
    <CardView style={styles.cardView} backgroundColor={theme.lightBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>{viewModel.title}</Text>
        <Text style={styles.body} numberOfLines={3}>
          {viewModel.brief}
        </Text>
        <Text style={styles.caption}>
          {i18n.t('phoning.callcontact.progressformat', {
            done: viewModel.calledCount,
            total: viewModel.numberOfPersonToCall,
          })}
        </Text>
        <ProgressBar
          progress={viewModel.calledCount / viewModel.numberOfPersonToCall}
          color={theme.primaryColor}
        />
        <PrimaryButton
          style={styles.callButton}
          title={i18n.t('phoning.campaign.action')}
          onPress={onCallButtonPressed}
          shape={'rounded'}
        />
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
    marginBottom: Spacing.margin,
  },
  callButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  caption: {
    ...Typography.caption1,
    color: Colors.lightText,
    paddingBottom: Spacing.unit,
  },
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  container: {
    padding: Spacing.margin,
  },
  image: {
    marginStart: Spacing.unit,
  },
  title: {
    ...Typography.title2,
    marginBottom: Spacing.margin,
  },
})

export default PhoningCampaignRow
