import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import { HomeQuickPollRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{ viewModel: HomeQuickPollRowContainerViewModel }>

const HomeQuickPollResultView: FunctionComponent<Props> = ({ viewModel }) => {
  const { theme } = useTheme()
  return (
    <View>
      <View style={styles.progressContainer}>
        <View>
          <Text style={[styles.leadingText, styles.percentage]}>
            {viewModel.leadingAnswerViewModel.formattedPercentage}
          </Text>
          <Text style={[styles.leadingText, styles.choice]}>
            {viewModel.leadingAnswerViewModel.title}
          </Text>
        </View>
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
        <View>
          <Text style={[styles.trailingText, styles.percentage]}>
            {viewModel.trailingAnswerViewModel.formattedPercentage}
          </Text>
          <Text style={[styles.trailingText, styles.choice]}>
            {viewModel.trailingAnswerViewModel.title}
          </Text>
        </View>
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
