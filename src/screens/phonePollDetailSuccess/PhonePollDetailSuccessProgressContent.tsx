import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import ProgressBar from '../shared/ProgressBar'
import { VerticalSpacer } from '../shared/Spacer'
import { PhonePollDetailSuccessRowSuccessViewModel } from './PhonePollDetailSuccessViewModel'

type Props = Readonly<{
  viewModel: PhonePollDetailSuccessRowSuccessViewModel
}>

export const PhonePollDetailSuccessProgressContent: FunctionComponent<Props> = ({
  viewModel,
}) => {
  if (!viewModel.isProgressDisplayed) {
    return null
  }
  return (
    <>
      <Text style={styles.caption}>
        {i18n.t('phoning.callcontact.progressformat', {
          count: viewModel.progress,
          done: viewModel.progress,
          total: viewModel.total,
        })}
      </Text>
      <VerticalSpacer spacing={Spacing.unit} />
      <ProgressBar
        progress={viewModel.progress / viewModel.total}
        color={Colors.accent}
      />
    </>
  )
}

const styles = StyleSheet.create({
  caption: {
    ...Typography.caption1,
    color: Colors.lightText,
  },
})
