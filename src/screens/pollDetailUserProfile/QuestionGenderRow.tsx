import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacing } from '../../styles'
import QuestionGenderButton from './QuestionGenderButton'
import { QuestionGenderRowViewModel } from './QuestionGenderRowViewModel'

type Props = Readonly<{
  viewModel: QuestionGenderRowViewModel
  onGenderSelected?: (id: string) => void
}>

const QuestionGenderRow: FunctionComponent<Props> = ({
  viewModel,
  onGenderSelected,
}) => {
  return (
    <View style={styles.container}>
      {viewModel.genders.map((genderViewModel, index) => {
        const isLastItem = index === viewModel.genders.length - 1
        const style = !isLastItem ? styles.button : null
        return (
          <QuestionGenderButton
            key={genderViewModel.id}
            style={style}
            viewModel={genderViewModel}
            onPress={() => onGenderSelected?.(genderViewModel.id)}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: Spacing.margin,
  },
  container: {
    flexDirection: 'row',
  },
})

export default QuestionGenderRow
