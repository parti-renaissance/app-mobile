import React from 'react'
import PollDetailQuestionChoice from './PollDetailQuestionChoice'
import { PollDetailQuestionSingleChoiceViewModelMapper } from './PollDetailQuestionSingleChoiceViewModelMapper'
import { Poll, Question } from '../../core/entities/Poll'
import {
  Answer,
  MultipleChoicesAnswer,
  SingleChoiceAnswer,
  TextAnswer,
} from '../../core/entities/Answer'
import { PollDetailQuestionMultipleChoicesViewModelMapper } from './PollDetailQuestionMultipleChoicesViewModelMapper'
import PollDetailQuestionInput from './PollDetailQuestionInput'
import { PollDetailQuestionInputViewModelMapper } from './PollDetailQuestionInputViewModelMapper'
import {
  AgeRange,
  Gender,
  Profession,
  UserProfile,
} from '../../core/entities/UserProfile'
import PollDetailQuestionUserProfile from '../pollDetailUserProfile/PollDetailQuestionUserProfile'
import { PollDetailQuestionUserProfileViewModelMapper } from '../pollDetailUserProfile/PollDetailQuestionUserProfileViewModelMapper'
import PollDetailQuestionUserData from '../pollDetailUserData/PollDetailQuestionUserData'
import { UserConsentData } from '../../core/entities/UserConsentData'
import { PollDetailQuestionUserDataViewModelMapper } from '../pollDetailUserData/PollDetailQuestionUserDataViewModelMapper'
import { PollResult } from '../../core/entities/PollResult'
import { StepType } from '../../core/entities/StepType'

export interface PollDetailComponentProvider {
  getStepComponent: (step: number) => JSX.Element
  getNumberOfSteps: () => number
  getStepType: (step: number) => StepType
  isNextStepAvailable: (step: number) => boolean
  isPreviousStepAvailable: (step: number) => boolean
  isDataComplete: (step: number) => boolean
  getResult: () => PollResult
}

const USER_PROFILE_COUNT = 1
const CONSENT_DATA_COUNT = 1

export class PollDetailComponentProviderImplementation
  implements PollDetailComponentProvider {
  private storage = new Map<number, Answer>()
  private questions: Array<Question>
  private onUpdate: () => void
  private numberOfSteps: number
  private profile: UserProfile = {
    gender: undefined,
    age: undefined,
    profession: undefined,
  }
  private consentData: UserConsentData = {
    isConsenting: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    zipCode: undefined,
    isWillingToJoin: undefined,
  }

  constructor(poll: Poll, onUpdate: () => void) {
    this.questions = poll.questions
    this.numberOfSteps =
      poll.questions.length + USER_PROFILE_COUNT + CONSENT_DATA_COUNT
    this.onUpdate = onUpdate
  }

  public getStepComponent(step: number): JSX.Element {
    switch (this.getStepType(step)) {
      case 'remoteQuestion':
        const question = this.questions[step]
        const answer = this.storage.get(question.id)
        return this.getComponent(question, answer)
      case 'userProfile':
        return this.getUserProfileComponent(this.profile)
      case 'consentData':
        return this.getUserDataComponent(this.consentData)
    }
  }

  public getStepType(step: number): StepType {
    if (step < this.questions.length) {
      return 'remoteQuestion'
    } else if (step < this.questions.length + USER_PROFILE_COUNT) {
      return 'userProfile'
    } else {
      return 'consentData'
    }
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps
  }

  public isNextStepAvailable(step: number): boolean {
    return step < this.numberOfSteps - 1
  }

  public isPreviousStepAvailable(step: number): boolean {
    return step > 0
  }

  public isDataComplete(step: number): boolean {
    switch (this.getStepType(step)) {
      case 'remoteQuestion':
        return true
      case 'userProfile':
        return true
      case 'consentData':
        return this.isConsentDataComplete()
    }
  }

  public getResult(): PollResult {
    return {
      answers: [...this.storage.values()],
      profile: this.profile,
      consentData: this.consentData,
    }
  }

  private isConsentDataComplete(): boolean {
    if (this.consentData.isConsenting === undefined) {
      return false
    }
    if (this.consentData.isConsenting) {
      return (
        (this.consentData.firstName?.length ?? 0) > 0 &&
        (this.consentData.lastName?.length ?? 0) > 0 &&
        (this.consentData.email?.length ?? 0) > 0 &&
        (this.consentData.zipCode?.length ?? 0) > 0 &&
        this.consentData.isWillingToJoin !== undefined
      )
    }
    return true
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

  private getUserProfileComponent(userProfile: UserProfile): JSX.Element {
    const viewModel = PollDetailQuestionUserProfileViewModelMapper.map(
      userProfile,
    )
    return (
      <PollDetailQuestionUserProfile
        viewModel={viewModel}
        onGenderChange={(gender) => {
          this.profile.gender =
            this.profile.gender === gender ? undefined : (gender as Gender)
          this.onUpdate()
        }}
        onAgeChange={(age) => {
          this.profile.age =
            this.profile.age === age ? undefined : (age as AgeRange)
          this.onUpdate()
        }}
        onProfessionChange={(profession) => {
          this.profile.profession =
            this.profile.profession === profession
              ? undefined
              : (profession as Profession)
          this.onUpdate()
        }}
      />
    )
  }

  private getUserDataComponent(data: UserConsentData): JSX.Element {
    const viewModel = PollDetailQuestionUserDataViewModelMapper.map(data)
    return (
      <PollDetailQuestionUserData
        viewModel={viewModel}
        onBlur={() => {
          this.consentData.firstName = this.consentData.firstName?.trim()
          this.consentData.lastName = this.consentData.lastName?.trim()
          this.consentData.email = this.consentData.email?.trim()
          this.consentData.zipCode = this.consentData.zipCode?.trim()
          this.onUpdate()
        }}
        onConsent={(isConsenting) => {
          this.consentData.isConsenting = isConsenting
          this.onUpdate()
        }}
        onInvitation={(isWillingToJoin) => {
          this.consentData.isWillingToJoin = isWillingToJoin
          this.onUpdate()
        }}
        onFirstNameChange={(firstName) => {
          this.consentData.firstName = firstName
          this.onUpdate()
        }}
        onLastNameChange={(lastName) => {
          this.consentData.lastName = lastName
          this.onUpdate()
        }}
        onEmailChange={(email) => {
          this.consentData.email = email
          this.onUpdate()
        }}
        onZipCodeChange={(zipCode) => {
          this.consentData.zipCode = zipCode
          this.onUpdate()
        }}
      />
    )
  }
}
