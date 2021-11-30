import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'

import ProgressBar from '../shared/ProgressBar'
import { PollDetailProgressBarViewModel } from './PollDetailProgressBarViewModel'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: PollDetailProgressBarViewModel
}>

const PollDetailProgressBar: FunctionComponent<Props> = ({
  viewModel,
  style,
}) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{viewModel.title}</Text>
      <ProgressBar progress={viewModel.progress} color={theme.primaryColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.unit,
  },
  text: {
    marginBottom: Spacing.unit,
    ...Typography.lightCaption1,
  },
})

export default PollDetailProgressBar
