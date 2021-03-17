import { CountryCode, isCountryCode } from 'react-native-country-picker-modal'
import { Address, DetailedProfile } from '../../core/entities/DetailedProfile'
import { Profile } from '../../core/entities/Profile'
import { Gender } from '../../core/entities/UserProfile'
import {
  RestDetailedProfileResponse,
  RestPostAddress,
} from '../restObjects/RestDetailedProfileResponse'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'

export const ProfileMapper = {
  map: (result: RestProfileResponse): Profile => {
    return {
      firstName: result.first_name,
      lastName: result.last_name,
      uuid: result.uuid,
      zipCode: result.postal_code,
      totalSurveys: result.surveys.total,
      totalSurveysLastMonth: result.surveys.last_month,
    }
  },
  mapDetailedProfile: (
    result: RestDetailedProfileResponse,
  ): DetailedProfile => {
    let nationality: CountryCode
    if (isCountryCode(result.nationality)) {
      nationality = result.nationality
    } else {
      // by default
      nationality = 'FR'
    }
    return {
      uuid: result.uuid,
      firstName: result.first_name,
      lastName: result.last_name,
      gender: restGender(result.gender),
      customGender: result.custom_gender ?? undefined,
      nationality: nationality,
      birthDate: result.birthdate ? new Date(result.birthdate) : undefined,
      address: postAddress(result.post_address),
      email: result.email_address ?? undefined,
      facebook: result.facebook_page_url ?? undefined,
      linkedin: result.linkedin_page_url ?? undefined,
      twitter: result.twitter_page_url ?? undefined,
      telegram: result.telegram_page_url ?? undefined,
    }
  },
}

const restGender = (gender: string | undefined): Gender | undefined => {
  if (!gender) {
    return undefined
  }
  switch (gender) {
    case 'male':
      return Gender.Male
    case 'female':
      return Gender.Female
    default:
      return Gender.Other
  }
}

const postAddress = (restPostAddress: RestPostAddress): Address => {
  return {
    address: restPostAddress.address ?? undefined,
    postalCode: restPostAddress.postal_code ?? undefined,
    city: restPostAddress.city_name ?? undefined,
    country: restPostAddress.country ?? undefined,
  }
}
