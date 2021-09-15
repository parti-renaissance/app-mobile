import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography, Colors } from '../../../styles'
import CardView from '../../shared/CardView'
import { useTheme } from '../../../themes'
import ProgressBar from '../../shared/ProgressBar'
import { PrimaryButton } from '../../shared/Buttons'
import i18n from '../../../utils/i18n'
import { VerticalSpacer } from '../../shared/Spacer'
import { HorizontalSeparator } from '../../shared/HorizontalSeparator'

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
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{viewModel.title}</Text>
        <VerticalSpacer spacing={Spacing.unit} />
        <Text style={styles.body} numberOfLines={3}>
          {viewModel.brief}
        </Text>
        <VerticalSpacer spacing={Spacing.unit} />
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
        <VerticalSpacer spacing={Spacing.margin} />
        <HorizontalSeparator />
        <VerticalSpacer spacing={Spacing.margin} />
        <PrimaryButton
          buttonStyle={styles.callButton}
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
  },
  callButton: {
    paddingVertical: Spacing.unit,
  },
  caption: {
    ...Typography.caption1,
    color: Colors.lightText,
    paddingBottom: Spacing.unit,
  },
  cardView: {
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
  },
})

export default PhoningCampaignRow
