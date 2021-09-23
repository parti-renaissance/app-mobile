import { RestPollResultAnswerLegacy } from './RestPollResultAnswer'

export interface RestPollResultRequest {
  survey: number
  type: string
  lastName?: string
  firstName?: string
  emailAddress?: string
  agreedToStayInContact: boolean
  agreedToContactForJoin: boolean
  agreedToTreatPersonalData: boolean
  postalCode?: string
  profession?: string
  ageRange?: string
  gender?: string
  answers: ReadonlyArray<RestPollResultAnswerLegacy>
  latitude?: number
  longitude?: number
}
