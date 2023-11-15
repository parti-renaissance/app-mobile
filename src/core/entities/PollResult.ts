import { Answer } from './Answer'
import { UserConsentData } from './UserConsentData'
import { UserProfile } from './UserProfile'

export interface PollRemoteQuestionResult {
  answers: ReadonlyArray<Answer>
}

export interface PollUserInformationsResult {
  profile: UserProfile
  consentData: UserConsentData
}

export type PollResult = PollRemoteQuestionResult & PollUserInformationsResult
