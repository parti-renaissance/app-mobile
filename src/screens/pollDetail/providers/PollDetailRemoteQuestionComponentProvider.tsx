import React from 'react'
import {
  Answer,
  MultipleChoicesAnswer,
  SingleChoiceAnswer,
  TextAnswer,
} from '../../../core/entities/Answer'
import { Poll, Question } from '../../../core/entities/Poll'
import { PollRemoteQuestionResult } from '../../../core/entities/PollResult'
import { StepType } from '../../../core/entities/StepType'
import PollDetailQuestionChoice from '../PollDetailQuestionChoice'
import PollDetailQuestionInput from '../PollDetailQuestionInput'
import { PollDetailQuestionInputViewModelMapper } from '../PollDetailQuestionInputViewModelMapper'
import { PollDetailQuestionMultipleChoicesViewModelMapper } from '../PollDetailQuestionMultipleChoicesViewModelMapper'
import { PollDetailQuestionSingleChoiceViewModelMapper } from '../PollDetailQuestionSingleChoiceViewModelMapper'
import { PollDetailComponentProvider } from './PollDetailComponentProvider'

export class PollDetailRemoteQuestionComponentProvider
  implements PollDetailComponentProvider<PollRemoteQuestionResult>
{
  private storage = new Map<number, Answer>()
  private questions: Array<Question>
  private onUpdate: () => void
  private numberOfSteps: number

  constructor(poll: Poll, onUpdate: () => void) {
    this.questions = poll.questions
    this.numberOfSteps = poll.questions.length
    this.onUpdate = onUpdate
  }

  public getStepComponent(step: number): JSX.Element {
    const question = this.questions[Number(step)]
    const answer = this.storage.get(question.id)
    return this.getComponent(question, answer)
  }

  public getStepType(_: number): StepType {
    return 'remoteQuestion'
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps
  }

  public isDataComplete(_: number): boolean {
    return true
  }

  public getResult(): PollRemoteQuestionResult {
    return {
      answers: [...this.storage.values()],
    }
  }

  private save(answer: Answer) {
    this.storage.set(answer.questionId, answer)
    this.onUpdate()
  }

  private removeAnswer(questionId: number) {
    this.storage.delete(questionId)
    this.onUpdate()
  }

  private getComponent(
    question: Question,
    answer: Answer | undefined,
  ): JSX.Element {
    switch (question.type) {
      case 'unique_choice':
        return this.getSingleChoiceComponent(
          question,
          (answer?.answer as SingleChoiceAnswer) ?? { choiceId: undefined },
        )
      case 'multiple_choice':
        return this.getMultipleChoicesComponent(
          question,
          (answer?.answer as MultipleChoicesAnswer) ?? { choiceIds: [] },
        )
      case 'simple_field':
        return this.getTextComponent(
          question,
          (answer?.answer as TextAnswer) ?? { value: '' },
        )
    }
  }

  private getTextComponent(
    question: Question,
    answer: TextAnswer,
  ): JSX.Element {
    const viewModel = PollDetailQuestionInputViewModelMapper.map(
      question,
      answer,
    )
    return (
      <PollDetailQuestionInput
        viewModel={viewModel}
        onChangeText={(text) => {
          this.save({
            questionId: question.id,
            answer: { value: text },
          })
        }}
      />
    )
  }

  private getSingleChoiceComponent(
    question: Question,
    answer: SingleChoiceAnswer,
  ): JSX.Element {
    const viewModel = PollDetailQuestionSingleChoiceViewModelMapper.map(
      question,
      answer,
    )
    return (
      <PollDetailQuestionChoice
        viewModel={viewModel}
        toggleChoice={(choiceId) => {
          const choiceIdInt: number = parseInt(choiceId, 10)
          if (choiceIdInt === answer.choiceId) {
            this.removeAnswer(question.id)
          } else {
            this.save({
              questionId: question.id,
              answer: { choiceId: choiceIdInt },
            })
          }
        }}
      />
    )
  }

  private getMultipleChoicesComponent(
    question: Question,
    answer: MultipleChoicesAnswer,
  ): JSX.Element {
    const viewModel = PollDetailQuestionMultipleChoicesViewModelMapper.map(
      question,
      answer,
    )
    return (
      <PollDetailQuestionChoice
        viewModel={viewModel}
        toggleChoice={(choiceId) => {
          let choiceIds: Array<number>
          if (answer.choiceIds.includes(parseInt(choiceId, 10))) {
            choiceIds = answer.choiceIds.filter(
              (id) => id !== parseInt(choiceId, 10),
            )
          } else {
            choiceIds = answer.choiceIds.concat([parseInt(choiceId, 10)])
          }
          const newAnswer: Answer = {
            questionId: question.id,
            answer: { choiceIds: choiceIds },
          }
          this.save(newAnswer)
        }}
      />
    )
  }
}
