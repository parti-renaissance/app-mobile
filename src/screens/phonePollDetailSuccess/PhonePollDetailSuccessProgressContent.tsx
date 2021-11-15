import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
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
  const { theme } = useTheme()

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
        color={theme.primaryColor}
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
