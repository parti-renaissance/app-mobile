import React, { FunctionComponent, useRef } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PollDetailQuestionInputViewModel } from './PollDetailQuestionInputViewModel'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import InputAccessoryClose from '../shared/InputAccessoryClose'
import { ScrollView } from 'react-native-gesture-handler'

type Props = Readonly<{
  viewModel: PollDetailQuestionInputViewModel
  onChangeText?: (text: string) => void
}>

const PollDetailQuestionInput: FunctionComponent<Props> = ({
  viewModel,
  onChangeText,
}) => {
  const inputAccessoryViewId =
    'PollDetailQuestionInputAccessoryViewId' + viewModel.id
  const inputRef = useRef<TextInput>(null)

  return (
    <KeyboardOffsetView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{viewModel.title}</Text>
          <View style={styles.inner}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              multiline={true}
              value={viewModel.content}
              placeholder={i18n.t('polldetail.question_placeholder')}
              inputAccessoryViewID={inputAccessoryViewId}
              onChangeText={onChangeText}
            />
            <InputAccessoryClose
              id={inputAccessoryViewId}
              title={i18n.t('common.keyboard.done')}
              onPress={() => inputRef.current?.blur()}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardOffsetView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
    flexGrow: 1,
  },
  inner: {
    flex: 1,
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.largeMargin,
  },
  input: {
    borderBottomColor: Colors.inputTextBorder,
    borderBottomWidth: Spacing.inputTextBorder,
    paddingBottom: Spacing.unit,
  },
  blur: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.margin,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default PollDetailQuestionInput
