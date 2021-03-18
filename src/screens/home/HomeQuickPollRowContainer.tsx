import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing } from '../../styles'
import { TertiaryButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { HomeQuickPollRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeQuickPollRowContainerViewModel
  onAnswerSelected: (answerId: number) => void
}>

const HomeQuickPollRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onAnswerSelected,
}) => {
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{viewModel.title}</Text>
        <View style={styles.buttonRow}>
          <TertiaryButton
            style={styles.leftButton}
            onPress={() =>
              onAnswerSelected(viewModel.leadingAnswerViewModel.id)
            }
            title={viewModel.leadingAnswerViewModel.title}
            noShadow={true}
          />
          <TertiaryButton
            style={styles.rightButton}
            onPress={() =>
              onAnswerSelected(viewModel.trailingAnswerViewModel.id)
            }
            title={viewModel.trailingAnswerViewModel.title}
            noShadow={true}
          />
        </View>
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginVertical: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  container: {
    padding: Spacing.margin,
    backgroundColor: Colors.groupedListBackground,
  },
  title: {
    marginBottom: Spacing.margin,
  },
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

export default HomeQuickPollRowContainer
