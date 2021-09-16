import React from 'react'
import { PhonePollSatisfactionResult } from '../../../core/entities/PhonePollResult'
import { PhoningSatisfactionAnswer } from '../../../core/entities/PhoningSatisfactionAnswer'
import { PhoningSatisfactionQuestion } from '../../../core/entities/PhoningSessionConfiguration'
import { StepType } from '../../../core/entities/StepType'
import PhonePollSatisfactionScreen from '../../phonePollSatisfaction/PhonePollSatisfactionScreen'
import { PhonePollSatisfactionViewModelMapper } from '../../phonePollSatisfaction/PhonePollSatisfactionViewModelMapper'
import { PollDetailComponentProvider } from '../../pollDetail/providers/PollDetailComponentProvider'

export class PhonePollDetailSatisfactionComponentProvider
  implements PollDetailComponentProvider<PhonePollSatisfactionResult> {
  private questions: Array<PhoningSatisfactionQuestion>
  private answers = new Map<string, PhoningSatisfactionAnswer>()
  private onUpdate: () => void
  private numberOfSteps: number

  constructor(
    questions: Array<PhoningSatisfactionQuestion>,
    onUpdate: () => void,
  ) {
    this.questions = questions
    this.numberOfSteps = 1
    this.onUpdate = onUpdate
  }

  public getStepComponent(step: number): JSX.Element {
    switch (this.getStepType(step)) {
      case 'phoneSatisfaction':
        return this.getSatisfactionComponent()
      default:
        return <></>
    }
  }

  public getStepType(_: number): StepType {
    return 'phoneSatisfaction'
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps
  }

  public isDataComplete(step: number): boolean {
    switch (this.getStepType(step)) {
      case 'phoneSatisfaction':
        return true
      default:
        return true
    }
  }

  public getResult(): PhonePollSatisfactionResult {
    return { satisfactionAnswers: Array.from(this.answers.values()) }
  }

  private getSatisfactionComponent(): JSX.Element {
    const viewModel = PhonePollSatisfactionViewModelMapper.map(
      this.questions,
      this.answers,
    )
    return (
      <PhonePollSatisfactionScreen
        viewModel={viewModel}
        onUpdateBoolean={(questionId, choice) => {
          const answer: PhoningSatisfactionAnswer = {
            code: questionId,
            type: 'boolean',
            value: choice,
          }
          const oldAnswer = this.answers.get(questionId)
          if (oldAnswer?.value === answer.value) {
            this.answers.delete(questionId)
          } else {
            this.answers.set(questionId, answer)
          }
          this.onUpdate()
        }}
      />
    )
  }
}
