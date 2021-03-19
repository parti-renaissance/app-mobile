import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing } from '../../styles'
import CardView from '../shared/CardView'
import HomeQuickPollChoicesView from './HomeQuickPollChoicesView'
import { HomeQuickPollRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeQuickPollRowContainerViewModel
  onAnswerSelected: (answerId: string) => void
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
        <HomeQuickPollChoicesView
          viewModel={viewModel}
          onAnswerSelected={onAnswerSelected}
        />
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
