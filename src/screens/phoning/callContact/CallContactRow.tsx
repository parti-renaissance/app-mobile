import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton } from '../../shared/Buttons'
import CardView from '../../shared/CardView'
import { HorizontalSeparator } from '../../shared/HorizontalSeparator'
import ProgressBar from '../../shared/ProgressBar'
import { VerticalSpacer } from '../../shared/Spacer'

type Props = Readonly<{
  viewModel: PhoningCallContactRowViewModel
  onCallButtonPressed: () => void
}>

export interface PhoningCallContactRowViewModel {
  id: string
  calledCount: number
  numberOfPersonToCall: number
}

const PhoningCallContactRow: FunctionComponent<Props> = ({
  viewModel,
  onCallButtonPressed,
}) => {
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('phoning.callcontact.title')}</Text>
        <VerticalSpacer spacing={Spacing.unit} />
        <Text style={styles.body}>{i18n.t('phoning.callcontact.body')}</Text>
        <VerticalSpacer spacing={Spacing.unit} />
        <Text style={styles.caption}>
          {i18n.t('phoning.callcontact.progressformat', {
            count: viewModel.calledCount,
            done: viewModel.calledCount,
            total: viewModel.numberOfPersonToCall,
          })}
        </Text>
        <ProgressBar
          progress={viewModel.calledCount / viewModel.numberOfPersonToCall}
          color={Colors.accent}
        />
        <VerticalSpacer spacing={Spacing.margin} />
        <HorizontalSeparator />
        <VerticalSpacer spacing={Spacing.margin} />
        <PrimaryButton
          buttonStyle={styles.callButton}
          title={i18n.t('phoning.callcontact.callbuttontitle')}
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

export default PhoningCallContactRow
