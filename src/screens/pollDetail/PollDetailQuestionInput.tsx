import React, { FunctionComponent, useRef, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Platform } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PollDetailQuestionInputViewModel } from './PollDetailQuestionInputViewModel'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import InputAccessoryClose from '../shared/InputAccessoryClose'
import { ScrollView } from 'react-native-gesture-handler'

type Props = Readonly<{
  viewModel: PollDetailQuestionInputViewModel
  onChangeText: (text: string) => void
}>

const PollDetailQuestionInputContent: FunctionComponent<Props> = ({
  viewModel,
  onChangeText,
}) => {
  const inputAccessoryViewId =
    'PollDetailQuestionInputAccessoryViewId' + viewModel.id
  const inputRef = useRef<TextInput>(null)
  const [remaingCharsLabel, setRemainingCharsLabel] = useState(
    computeRemainingCharsLabel(''),
  )

  const textChanged = (text: string) => {
    setRemainingCharsLabel(computeRemainingCharsLabel(text))
    onChangeText(text)
  }
  return (
    <>
      <Text style={styles.title}>{viewModel.title}</Text>
      <View style={styles.inner}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          multiline={true}
          value={viewModel.content}
          placeholder={i18n.t('polldetail.question_placeholder')}
          inputAccessoryViewID={inputAccessoryViewId}
          onChangeText={textChanged}
          maxLength={MAX_CHARACTERS}
        />
        <Text style={styles.remaingCharsIndicator}>{remaingCharsLabel}</Text>
        <InputAccessoryClose
          id={inputAccessoryViewId}
          title={i18n.t('common.keyboard.done')}
          onPress={() => inputRef.current?.blur()}
        />
      </View>
    </>
  )
}

const PollDetailQuestionInput: FunctionComponent<Props> = (props) => {
  if (Platform.OS === 'android') {
    return (
      <KeyboardOffsetView>
        <ScrollView>
          <View style={styles.container}>
            <PollDetailQuestionInputContent {...props} />
          </View>
        </ScrollView>
      </KeyboardOffsetView>
    )
  } else {
    return (
      <KeyboardOffsetView style={styles.container}>
        <PollDetailQuestionInputContent {...props} />
      </KeyboardOffsetView>
    )
  }
}

const MAX_CHARACTERS = 255
function computeRemainingCharsLabel(text: string): string {
  const textLength = text.length
  return `${textLength}/${MAX_CHARACTERS}`
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.small,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  inner: {
    flex: 1,
    marginBottom: Spacing.unit,
  },
  input: {
    borderBottomColor: Colors.inputTextBorder,
    borderBottomWidth: Spacing.inputTextBorder,
    paddingBottom: Spacing.unit,
  },
  remaingCharsIndicator: {
    ...Typography.caption1,
    color: Colors.darkText,
    textAlign: 'right',
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.largeMargin,
  },
})

export default PollDetailQuestionInput
