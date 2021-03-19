import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing } from '../../styles'
import CardView from '../shared/CardView'
import HomeQuickPollChoicesView from './HomeQuickPollChoicesView'
import HomeQuickPollResultView from './HomeQuickPollResultView'
import { HomeQuickPollRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeQuickPollRowContainerViewModel
  onAnswerSelected: (pollId: string, answerId: string) => void
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
        {viewModel.type === 'question' ? (
          <HomeQuickPollChoicesView
            viewModel={viewModel}
            onAnswerSelected={onAnswerSelected}
          />
        ) : (
          <HomeQuickPollResultView viewModel={viewModel} />
        )}
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
})

export default HomeQuickPollRowContainer
