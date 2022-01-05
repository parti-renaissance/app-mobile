import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { useTheme } from '../../../themes'
import { HomeQuickPollRowAnswerViewModel } from './HomeQuickPollRowAnswerViewModel'
import { HomeQuickPollRowContainerViewModel } from '../HomeRowViewModel'

const TextContainer: FunctionComponent<
  Readonly<{
    viewModel: HomeQuickPollRowAnswerViewModel
    textStyle: TextStyle
  }>
> = ({ viewModel, textStyle }) => {
  return (
    <View>
      <Text style={[textStyle, styles.percentage]}>
        {viewModel.formattedPercentage}
      </Text>
      <Text style={[textStyle, styles.choice]}>{viewModel.title}</Text>
    </View>
  )
}

type Props = Readonly<{ viewModel: HomeQuickPollRowContainerViewModel }>

const HomeQuickPollResultView: FunctionComponent<Props> = ({ viewModel }) => {
  const { theme } = useTheme()
  return (
    <View>
      <View style={styles.progressContainer}>
        <TextContainer
          viewModel={viewModel.leadingAnswerViewModel}
          textStyle={styles.leadingText}
        />
        <View style={styles.middle}>
          <View
            style={[
              styles.progress,
              {
                backgroundColor: Colors.quickPollProgress,
                width: viewModel.leadingAnswerViewModel.percentage + '%',
              },
            ]}
          />
        </View>
        <TextContainer
          viewModel={viewModel.trailingAnswerViewModel}
          textStyle={styles.trailingText}
        />
      </View>
      <Text style={styles.votesCount}>{viewModel.totalVotes}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  choice: {
    ...Typography.lightCaption1OnLightBackground,
  },
  leadingText: {
    textAlign: 'right',
  },
  middle: {
    backgroundColor: Colors.defaultBackground,
    borderRadius: 8.0,
    flexGrow: 1,
    marginHorizontal: Spacing.unit,
    minHeight: 40,
    overflow: 'hidden',
  },
  percentage: {
    ...Typography.subheadline,
  },
  progress: {
    flex: 1,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.unit,
  },
  trailingText: {
    textAlign: 'left',
  },
  votesCount: {
    ...Typography.lightCaption1OnLightBackground,
    marginTop: Spacing.margin,
  },
})

export default HomeQuickPollResultView
