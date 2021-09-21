import React, { FunctionComponent, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import InputAccessoryClose from '../shared/InputAccessoryClose'
import { PollDetailQuestionInputContentViewModel } from './PollDetailQuestionInputViewModel'

type PollDetailQuestionInputContentProps = Readonly<{
  viewModel: PollDetailQuestionInputContentViewModel
  onChangeText: (text: string) => void
}>

const PollDetailQuestionInputContent: FunctionComponent<PollDetailQuestionInputContentProps> = ({
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
    <View style={styles.inner}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        multiline={true}
        value={viewModel.text}
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
  )
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
})

export default PollDetailQuestionInputContent
