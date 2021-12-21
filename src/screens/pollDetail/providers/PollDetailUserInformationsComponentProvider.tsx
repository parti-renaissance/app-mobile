import React from 'react'
import {
  AgeRange,
  Gender,
  Profession,
  UserProfile,
} from '../../../core/entities/UserProfile'
import PollDetailQuestionUserProfile from '../../pollDetailUserProfile/PollDetailQuestionUserProfile'
import { PollDetailQuestionUserProfileViewModelMapper } from '../../pollDetailUserProfile/PollDetailQuestionUserProfileViewModelMapper'
import PollDetailQuestionUserData from '../../pollDetailUserData/PollDetailQuestionUserData'
import { UserConsentData } from '../../../core/entities/UserConsentData'
import { PollDetailQuestionUserDataViewModelMapper } from '../../pollDetailUserData/PollDetailQuestionUserDataViewModelMapper'
import { PollUserInformationsResult } from '../../../core/entities/PollResult'
import { StepType } from '../../../core/entities/StepType'
import { PollDetailComponentProvider } from './PollDetailComponentProvider'

const STEPS: Array<StepType> = ['userProfile', 'consentData']

export class PollDetailUserInformationsComponentProvider
  implements PollDetailComponentProvider<PollUserInformationsResult> {
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

  constructor(onUpdate: () => void) {
    this.numberOfSteps = STEPS.length
    this.onUpdate = onUpdate
  }

  public getStepComponent(step: number): JSX.Element {
    switch (this.getStepType(step)) {
      case 'userProfile':
        return this.getUserProfileComponent(this.profile)
      case 'consentData':
        return this.getUserDataComponent(this.consentData)
      default:
        return <></>
    }
  }

  public getStepType(step: number): StepType {
    return STEPS[Number(step)]
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps
  }

  public isDataComplete(step: number): boolean {
    switch (this.getStepType(step)) {
      case 'remoteQuestion':
        return true
      case 'userProfile':
        return true
      case 'consentData':
        return this.isConsentDataComplete()
      case 'phoneSatisfaction':
        return true
      case 'doorToDoorQualification':
        return true
    }
  }

  public getResult(): PollUserInformationsResult {
    return {
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
