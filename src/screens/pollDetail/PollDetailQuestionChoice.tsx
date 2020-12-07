import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import { Spacing, Typography } from '../../styles'
import QuestionChoiceRow from './QuestionChoiceRow'
import { PollDetailQuestionChoiceViewModel } from './PollDetailQuestionChoiceViewModel'
import { QuestionChoiceRowViewModel } from './QuestionChoiceRowViewModel'

type Props = Readonly<{
  viewModel: PollDetailQuestionChoiceViewModel
  toggleChoice?: (choiceId: string) => void
}>

const PollDetailQuestionChoice: FunctionComponent<Props> = ({
  viewModel,
  toggleChoice,
}) => {
  const renderItem = ({
    item,
  }: ListRenderItemInfo<QuestionChoiceRowViewModel>) => {
    return (
      <QuestionChoiceRow
        viewModel={item}
        onPress={() => toggleChoice?.(item.id)}
      />
    )
  }

  const QuestionChoiceHeader = () => {
    return (
      <>
        <Text style={styles.title}>{viewModel.title}</Text>
        <Text style={styles.callout}>{viewModel.subtitle}</Text>
      </>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      style={styles.list}
      data={viewModel.answers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<QuestionChoiceHeader />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  list: {
    flex: 1,
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
  },
  callout: {
    ...Typography.lightCallout,
    marginBottom: Spacing.margin,
  },
})

export default PollDetailQuestionChoice
