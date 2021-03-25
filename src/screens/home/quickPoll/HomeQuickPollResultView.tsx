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
                backgroundColor: theme.quickPollProgress,
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
  progressContainer: {
    paddingHorizontal: Spacing.unit,
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    ...Typography.subheadline,
  },
  choice: {
    ...Typography.lightCalloutOnLightBackground,
  },
  leadingText: {
    textAlign: 'right',
  },
  trailingText: {
    textAlign: 'left',
  },
  middle: {
    flexGrow: 1,
    marginHorizontal: Spacing.unit,
    backgroundColor: Colors.defaultBackground,
    minHeight: 40,
    borderRadius: 8.0,
    overflow: 'hidden',
  },
  progress: {
    flex: 1,
  },
  votesCount: {
    ...Typography.lightCalloutOnLightBackground,
    marginTop: Spacing.margin,
  },
})

export default HomeQuickPollResultView
