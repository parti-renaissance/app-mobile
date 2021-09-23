import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, View, Platform } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { PollDetailQuestionInputViewModel } from './PollDetailQuestionInputViewModel'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import { ScrollView } from 'react-native-gesture-handler'
import PollDetailQuestionInputContent from './PollDetailQuestionInputContent'

type PollDetailQuestionInputProps = Readonly<{
  viewModel: PollDetailQuestionInputViewModel
  onChangeText: (text: string) => void
}>

const PollDetailQuestionInput: FunctionComponent<PollDetailQuestionInputProps> = ({
  viewModel,
  onChangeText,
}) => {
  if (Platform.OS === 'android') {
    return (
      <KeyboardOffsetView>
        <ScrollView>
          <View style={styles.container}>
            <>
              <Text style={styles.title}>{viewModel.title}</Text>
              <PollDetailQuestionInputContent
                viewModel={viewModel.content}
                onChangeText={onChangeText}
              />
            </>
          </View>
        </ScrollView>
      </KeyboardOffsetView>
    )
  } else {
    return (
      <KeyboardOffsetView style={styles.container}>
        <>
          <Text style={styles.title}>{viewModel.title}</Text>
          <PollDetailQuestionInputContent
            viewModel={viewModel.content}
            onChangeText={onChangeText}
          />
        </>
      </KeyboardOffsetView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.largeMargin,
  },
})

export default PollDetailQuestionInput
