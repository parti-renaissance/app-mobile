import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacing, Styles } from '../../styles'
import i18n from '../../utils/i18n'
import { BorderlessButton, TertiaryButton } from '../shared/Buttons'
import { PollDetailNavigationButtonsViewModel } from './PollDetailNavigationButtonsViewModel'

type Props = Readonly<{
  viewModel: PollDetailNavigationButtonsViewModel
  onNext?: () => void
  onPrevious?: () => void
  onSubmit?: () => void
}>

const PollDetailNavigationButtons: FunctionComponent<Props> = ({
  viewModel,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.left}>
        {viewModel.displayPrevious ? (
          <BorderlessButton
            onPress={onPrevious}
            title={i18n.t('polldetail.previous')}
          />
        ) : null}
      </View>
      <View style={styles.center}>
        <TertiaryButton
          disabled={!viewModel.mainButton.isEnabled}
          onPress={viewModel.mainButton.type === 'next' ? onNext : onSubmit}
          title={viewModel.mainButton.title}
          style={styles.nextButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.elevatedContainerStyle,
    flexDirection: 'row',
    paddingVertical: Spacing.margin,
  },
  center: {
    flexGrow: 1,
    marginHorizontal: Spacing.margin,
  },
  left: {
    marginStart: Spacing.unit,
  },
  nextButton: {
    minWidth: Spacing.minWidthButton,
  },
  right: {
    flex: 1,
  },
})

export default PollDetailNavigationButtons
