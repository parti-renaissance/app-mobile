import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacing } from '../../styles'
import { TertiaryButton } from '../shared/Buttons'
import { HomeQuickPollRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeQuickPollRowContainerViewModel
  onAnswerSelected: (pollId: string, answerId: string) => void
}>

const HomeQuickPollChoicesView: FunctionComponent<Props> = ({
  viewModel,
  onAnswerSelected,
}) => {
  return (
    <View style={styles.buttonRow}>
      <TertiaryButton
        style={styles.leftButton}
        onPress={() =>
          onAnswerSelected(viewModel.id, viewModel.leadingAnswerViewModel.id)
        }
        title={viewModel.leadingAnswerViewModel.title}
        noShadow={true}
      />
      <TertiaryButton
        style={styles.rightButton}
        onPress={() =>
          onAnswerSelected(viewModel.id, viewModel.trailingAnswerViewModel.id)
        }
        title={viewModel.trailingAnswerViewModel.title}
        noShadow={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
  },
  leftButton: {
    flex: 1,
    marginRight: Spacing.margin,
  },
  rightButton: {
    flex: 1,
  },
})

export default HomeQuickPollChoicesView
