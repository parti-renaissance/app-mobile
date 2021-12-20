import React from 'react'
import { ListRenderItem, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import {
  isPollExtraMultipleChoicesAnswer,
  isPollExtraSingleChoiceAnswer,
  PollExtraAnswer,
  PollExtraCompoundAnswer,
  PollExtraMultipleChoicesAnswer,
  PollExtraSingleChoiceAnswer,
  PollExtraTextAnswer,
} from '../../../../../core/entities/PollExtraAnswer'
import {
  PollExtraQuestion,
  PollExtraQuestionChoiceOptions,
  PollExtraQuestionPage,
} from '../../../../../core/entities/PollExtraQuestion'
import { StepType } from '../../../../../core/entities/StepType'
import { Spacing } from '../../../../../styles'
import PollDetailQuestionChoice from '../../../../pollDetail/PollDetailQuestionChoice'
import PollDetailQuestionInput from '../../../../pollDetail/PollDetailQuestionInput'
import { PollDetailComponentProvider } from '../../../../pollDetail/providers/PollDetailComponentProvider'
import QualificationDescription from '../../qualification/QualificationDescription'
import QualificationFormUserData from '../../qualification/QualificationFormUserData'
import { QualificationResult } from '../DoorToDoorQuestionResult'
import { PollExtraQuestionMapper } from '../mapper/PollExtraQuestionMapper'

export class DoorToDoorQualificationComponentProvider
  implements PollDetailComponentProvider<QualificationResult> {
  private onUpdate: () => void
  private numberOfSteps: number
  private pages: Array<PollExtraQuestionPage>
  private storage = new Map<string, PollExtraAnswer>()

  constructor(pages: Array<PollExtraQuestionPage>, onUpdate: () => void) {
    this.numberOfSteps = pages.length
    this.pages = pages
    this.onUpdate = onUpdate
  }

  public getStepComponent(step: number): JSX.Element {
    // eslint-disable-next-line security/detect-object-injection
    const page = this.pages[step]
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.filterQuestionsUsingDependencies(page)}
        renderItem={this.renderItem}
        ListHeaderComponent={() => this.renderHeader(page.description)}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }

  private renderHeader = (description: string | null) => {
    return description ? (
      <QualificationDescription
        key="page_description"
        style={styles.header}
        description={description}
      />
    ) : null
  }

  public getStepType(_step: number): StepType {
    return 'doorToDoorQualification'
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps
  }

  public isDataComplete(_step: number): boolean {
    return true
  }

  public getResult(): QualificationResult {
    return {
      answers: Array.from(this.storage.values()),
    }
  }

  private renderItem: ListRenderItem<PollExtraQuestion> = ({ item }) => {
    const answer = this.storage.get(item.code)
    switch (item.type) {
      case 'choice':
        return this.getChoiceComponent(item, answer)
      case 'compound':
        return this.getCompoundComponent(
          item,
          (answer?.answer as PollExtraCompoundAnswer) ?? {
            values: new Map<string, string>(),
          },
        )
      case 'text':
        return this.getTextComponent(
          item,
          (answer?.answer as PollExtraTextAnswer) ?? { value: '' },
        )
    }
  }

  private getChoiceComponent(
    item: PollExtraQuestion,
    answer: PollExtraAnswer | undefined,
  ): JSX.Element {
    const options = item.options as PollExtraQuestionChoiceOptions
    if (options.multiple === true) {
      return this.getMultipleChoicesComponent(
        item,
        (answer?.answer as PollExtraMultipleChoicesAnswer) ?? { choiceIds: [] },
      )
    } else {
      return this.getSingleChoiceComponent(
        item,
        (answer?.answer as PollExtraSingleChoiceAnswer) ?? { choiceId: '' },
      )
    }
  }

  private getSingleChoiceComponent(
    question: PollExtraQuestion,
    answer: PollExtraSingleChoiceAnswer,
  ): JSX.Element {
    const options = question.options as PollExtraQuestionChoiceOptions
    return (
      <PollDetailQuestionChoice
        viewModel={PollExtraQuestionMapper.mapSingleChoice(question, answer)}
        toggleChoice={(choiceId: string) => {
          if (answer.choiceId === choiceId) {
            this.removeAnswer(question.code)
          } else {
            this.saveAnswer({
              questionId: question.code,
              answer: { choiceId: choiceId },
            })
          }
        }}
        columns={options.columns}
      />
    )
  }

  private getMultipleChoicesComponent(
    question: PollExtraQuestion,
    answer: PollExtraMultipleChoicesAnswer,
  ): JSX.Element {
    return (
      <PollDetailQuestionChoice
        key={question.code}
        viewModel={PollExtraQuestionMapper.mapMultipleChoice(question, answer)}
        toggleChoice={(choiceId) => {
          const choiceIds: Array<string> = answer?.choiceIds.includes(choiceId)
            ? answer?.choiceIds.filter((id) => id !== choiceId) ?? []
            : answer?.choiceIds.concat([choiceId]) ?? []
          const newAnswer: PollExtraAnswer = {
            questionId: question.code,
            answer: { choiceIds: choiceIds },
          }
          if (choiceIds.length === 0) {
            this.removeAnswer(question.code)
          } else {
            this.saveAnswer(newAnswer)
          }
        }}
      />
    )
  }

  private getTextComponent(
    question: PollExtraQuestion,
    answer: PollExtraTextAnswer,
  ): JSX.Element {
    const viewModel = PollExtraQuestionMapper.mapInput(question, answer)
    return (
      <PollDetailQuestionInput
        key={question.code}
        viewModel={viewModel}
        onChangeText={(text) => {
          if (text === '') {
            this.removeAnswer(question.code)
          } else {
            this.saveAnswer({
              questionId: question.code,
              answer: { value: text },
            })
          }
        }}
      />
    )
  }

  private getCompoundComponent(
    question: PollExtraQuestion,
    answer: PollExtraCompoundAnswer,
  ): JSX.Element {
    return (
      <QualificationFormUserData
        key={question.code}
        viewModel={PollExtraQuestionMapper.mapCompound(
          question,
          answer ?? { values: new Map<string, string>() },
        )}
        onValueChange={(id: string, value: string) => {
          if (value === '') {
            answer.values.delete(id)
          } else {
            answer.values.set(id, value)
          }
          this.saveAnswer({
            questionId: question.code,
            answer: answer,
          })
        }}
        onBlur={() => {}}
      />
    )
  }

  private renderSeparator = () => <View style={styles.separator} />

  private saveAnswer(answer: PollExtraAnswer) {
    this.storage.set(answer.questionId, answer)
    this.onUpdate()
  }

  private removeAnswer(questionId: string) {
    this.storage.delete(questionId)
    this.onUpdate()
  }

  private filterQuestionsUsingDependencies = (
    page: PollExtraQuestionPage,
  ): Array<PollExtraQuestion> => {
    return page.questions.filter((question) => {
      const dependency = question.dependency
      if (dependency) {
        const storedAnswer = this.storage.get(dependency.question)
        if (
          storedAnswer &&
          isPollExtraSingleChoiceAnswer(storedAnswer.answer)
        ) {
          const choice = (storedAnswer.answer as PollExtraSingleChoiceAnswer)
            .choiceId
          return dependency.choices.some((condition) => choice === condition)
        } else if (
          storedAnswer &&
          isPollExtraMultipleChoicesAnswer(storedAnswer.answer)
        ) {
          const choices = (storedAnswer.answer as PollExtraMultipleChoicesAnswer)
            .choiceIds
          return dependency.choices.some((choice) => choices.includes(choice))
        } else {
          // Compound and TextInput cannot be in a dependency
          return false
        }
      }
      return true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.unit,
  },
  header: {
    marginBottom: Spacing.margin,
  },
  separator: {
    height: Spacing.margin,
  },
})