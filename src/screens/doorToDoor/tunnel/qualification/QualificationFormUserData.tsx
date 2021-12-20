import React, { FunctionComponent } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import { Spacing, Typography } from '../../../../styles'
import { QuestionTextInputRowViewModel } from '../../../pollDetailUserData/PollDetailQuestionUserDataViewModel'
import KeyboardOffsetView from '../../../shared/KeyboardOffsetView'
import LabelTextInput from '../../../shared/LabelTextInput'
import { QualificationFormUserDataViewModel } from './QualificationFormUserDataViewModel'

type Props = Readonly<{
  viewModel: QualificationFormUserDataViewModel
  onValueChange: (id: string, value: string) => void
  onBlur: () => void
}>

const QualificationFormUserData: FunctionComponent<Props> = ({
  viewModel,
  onValueChange,
  onBlur,
}) => {
  const refStorage: Record<string, TextInput> = {}

  const renderItem: ListRenderItem<QuestionTextInputRowViewModel> = ({
    item,
    index,
  }) => {
    const isLastItem = index === viewModel.data.length - 1
    return (
      <LabelTextInput
        ref={(ref: TextInput) => (refStorage[item.id] = ref)}
        style={styles.textInput}
        label={item.title}
        textInputProps={{
          value: item.value,
          autoCapitalize: item.autocapitalize,
          keyboardType: item.keyboardType,
          maxLength: item.maxLength,
          returnKeyType: isLastItem ? 'done' : 'next',
          onChangeText: (text) => {
            onValueChange(item.id, text)
          },
          onSubmitEditing: () => {
            if (index + 1 < viewModel.data.length) {
              const nextId = viewModel.data[index + 1].id
              refStorage[String(nextId)]?.focus()
            }
          },
          onBlur: onBlur,
        }}
      />
    )
  }

  return (
    <KeyboardOffsetView>
      <FlatList
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        data={viewModel.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        ListHeaderComponent={() => (
          <Text style={styles.title}>{viewModel.title}</Text>
        )}
      />
    </KeyboardOffsetView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginHorizontal: Spacing.unit,
  },
  listContainer: {
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  textInput: {
    marginBottom: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    marginBottom: Spacing.margin,
  },
})

export default QualificationFormUserData
