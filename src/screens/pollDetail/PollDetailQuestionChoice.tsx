import React, { FunctionComponent } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { PollDetailQuestionChoiceViewModel } from './PollDetailQuestionChoiceViewModel'
import QuestionChoiceRow from './QuestionChoiceRow'
import { QuestionChoiceRowViewModel } from './QuestionChoiceRowViewModel'

type Props = Readonly<{
  viewModel: PollDetailQuestionChoiceViewModel
  toggleChoice?: (choiceId: string) => void
  columns?: number
  choiceRadius?: number
}>

const PollDetailQuestionChoice: FunctionComponent<Props> = ({
  viewModel,
  toggleChoice,
  columns = 1,
  choiceRadius = 40,
}) => {
  const styles = stylesFactory(columns, choiceRadius)

  const renderItem = ({
    item,
  }: ListRenderItemInfo<QuestionChoiceRowViewModel>) => {
    return (
      <QuestionChoiceRow
        style={styles.choice}
        viewModel={item}
        onPress={() => toggleChoice?.(item.id)}
      />
    )
  }

  const QuestionChoiceHeader = () => {
    return (
      <>
        <Text style={styles.title}>{viewModel.title}</Text>
        {viewModel.subtitle ? (
          <Text style={styles.callout}>{viewModel.subtitle}</Text>
        ) : null}
      </>
    )
  }

  return (
    <FlatList
      key={columns}
      contentContainerStyle={styles.container}
      style={styles.list}
      data={viewModel.answers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<QuestionChoiceHeader />}
      numColumns={columns}
    />
  )
}

const stylesFactory = (columns: number, choiceRadius: number) => {
  return StyleSheet.create({
    callout: {
      ...Typography.lightCaption1,
      marginBottom: Spacing.margin,
      marginHorizontal: Spacing.margin,
    },
    choice: {
      borderRadius: choiceRadius,
      flex: 1 / columns, // for FlatList last item width
      marginHorizontal: Spacing.unit,
    },
    container: {
      paddingHorizontal: Spacing.unit,
      paddingVertical: Spacing.unit,
    },
    list: {
      flex: 1,
    },
    title: {
      ...Typography.headline,
      marginBottom: Spacing.unit,
      marginHorizontal: Spacing.margin,
    },
  })
}

export default PollDetailQuestionChoice
