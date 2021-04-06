import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography } from '../../../styles'
import CardView from '../../shared/CardView'
import HomeQuickPollChoicesView from './HomeQuickPollChoicesView'
import HomeQuickPollResultView from './HomeQuickPollResultView'
import { HomeQuickPollRowContainerViewModel } from '../HomeRowViewModel'
import { useTheme } from '../../../themes'

type Props = Readonly<{
  viewModel: HomeQuickPollRowContainerViewModel
  onAnswerSelected: (pollId: string, answerId: string) => void
}>

const HomeQuickPollRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onAnswerSelected,
}) => {
  const { theme } = useTheme()
  return (
    <CardView style={styles.cardView} backgroundColor={theme.lightBackground}>
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
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  container: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.subheadline,
    lineHeight: 20,
    marginBottom: Spacing.margin,
  },
})

export default HomeQuickPollRowContainer
