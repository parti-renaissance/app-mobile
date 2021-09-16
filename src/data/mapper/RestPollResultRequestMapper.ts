import { Poll } from '../../core/entities/Poll'
import { PollResult } from '../../core/entities/PollResult'
import { AgeRange, Gender, Profession } from '../../core/entities/UserProfile'
import { RestPollResultRequest } from '../restObjects/RestPollResultRequest'
import { GenderMapper } from './GenderMapper'
import { Location } from 'react-native-location'
import { RestPollResultAnswerLegacyMapper } from './RestPollResultAnswerLegacyMapper'

const restGender = (gender: Gender | undefined): string | undefined => {
  if (!gender) {
    return undefined
  }
  return GenderMapper.mapFromGender(gender)
}

const restProfession = (
  profession: Profession | undefined,
): string | undefined => {
  if (!profession) {
    return undefined
  }
  switch (profession) {
    case Profession.Employee:
      return 'employees'
    case Profession.Worker:
      return 'workers'
    case Profession.Executive:
      return 'managerial staff'
    case Profession.TempWorker:
      return 'intermediate_professions'
    case Profession.Independent:
      return 'self_contractor'
    case Profession.Retired:
      return 'retirees'
    case Profession.Student:
      return 'student'
  }
}

const restAge = (age: AgeRange | undefined): string | undefined => {
  if (!age) {
    return undefined
  }
  switch (age) {
    case AgeRange.UpTo20:
      return 'less_than_20'
    case AgeRange.From20To24:
      return 'between_20_24'
    case AgeRange.From25To39:
      return 'between_25_39'
    case AgeRange.From40To54:
      return 'between_40_54'
    case AgeRange.From55To64:
      return 'between_55_64'
    case AgeRange.From65To80:
      return 'between_65_80'
    case AgeRange.From80:
      return 'greater_than_80'
  }
}

export const RestPollResultRequestMapper = {
  map: (
    poll: Poll,
    result: PollResult,
    location: Location | null,
  ): RestPollResultRequest => {
    return {
      survey: poll.id,
      type: poll.type,
      lastName: result.consentData?.lastName,
      firstName: result.consentData?.firstName,
      emailAddress: result.consentData?.email,
      agreedToStayInContact: result.consentData?.isConsenting ?? false,
      agreedToContactForJoin: result.consentData?.isWillingToJoin ?? false,
      agreedToTreatPersonalData: result.consentData?.isConsenting ?? false,
      postalCode: result.consentData?.zipCode,
      profession: restProfession(result.profile?.profession),
      ageRange: restAge(result.profile?.age),
      gender: restGender(result.profile?.gender),
      answers: result.answers.map(RestPollResultAnswerLegacyMapper.map),
      latitude: location?.latitude ?? undefined,
      longitude: location?.longitude ?? undefined,
    }
  },
}
