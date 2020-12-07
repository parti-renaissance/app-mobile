import { Answer } from './Answer'
import { UserConsentData } from './UserConsentData'
import { UserProfile } from './UserProfile'

export interface PollResult {
  answers: ReadonlyArray<Answer>
  profile: UserProfile
  consentData: UserConsentData
}
