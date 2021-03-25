import { CountryCode, isCountryCode } from 'react-native-country-picker-modal'
import {
  Address,
  DetailedProfile,
  PhoneNumber,
} from '../../core/entities/DetailedProfile'
import { Profile } from '../../core/entities/Profile'
import { Gender } from '../../core/entities/UserProfile'
import i18n from '../../utils/i18n'
import {
  RestDetailedProfileResponse,
  RestPhoneNumber,
  RestPostAddress,
} from '../restObjects/RestDetailedProfileResponse'
import { RestProfileResponse } from '../restObjects/RestProfileResponse'
import {
  RestUpdatePhoneNumber,
  RestUpdatePostAddress,
  RestUpdateProfileRequest,
} from '../restObjects/RestUpdateProfileRequest'

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
      nationality = i18n.t('personalinformation.default_country_code')
    }
    return {
      uuid: result.uuid,
      firstName: result.first_name,
      lastName: result.last_name,
      gender: restGenderToGender(result.gender),
      customGender: result.custom_gender ?? undefined,
      nationality: nationality,
      birthDate: new Date(result.birthdate),
      address: postAddress(result.post_address),
      email: result.email_address ?? undefined,
      facebook: result.facebook_page_url ?? undefined,
      linkedin: result.linkedin_page_url ?? undefined,
      twitter: result.twitter_page_url ?? undefined,
      telegram: result.telegram_page_url ?? undefined,
      phone: phoneNumber(result.phone),
    }
  },
  mapDetailedProfileUpdate: (
    profile: DetailedProfile,
  ): RestUpdateProfileRequest => {
    let phone: RestUpdatePhoneNumber | null
    if (profile.phone) {
      phone = {
        country: profile.phone.countryCode,
        number: profile.phone.number,
      }
    } else {
      phone = null
    }
    let address: RestUpdatePostAddress | null
    if (profile.address) {
      address = {
        address: profile.address.address ?? '',
        postal_code: profile.address.postalCode ?? '',
        city_name: profile.address.city ?? '',
        country: profile.address.country ?? '',
      }
    } else {
      address = null
    }
    return {
      first_name: profile.firstName,
      last_name: profile.lastName,
      gender: genderToRestGender(profile.gender),
      custom_gender: profile.customGender ?? null,
      birthdate: profile.birthDate?.toUTCString() ?? null,
      nationality: profile.nationality,
      address: address,
      email_address: profile.email,
      phone: phone,
      facebook_page_url: profile.facebook ?? '',
      linkedin_page_url: profile.linkedin ?? '',
      twitter_page_url: profile.twitter ?? '',
      telegram_page_url: profile.telegram ?? '',
    }
  },
}

const restGenderToGender = (gender: string): Gender => {
  switch (gender) {
    case 'male':
      return Gender.Male
    case 'female':
      return Gender.Female
    default:
      return Gender.Other
  }
}

const genderToRestGender = (gender: Gender): string => {
  switch (gender) {
    case Gender.Male:
      return 'male'
    case Gender.Female:
      return 'female'
    case Gender.Other:
      return 'other'
  }
}

const postAddress = (restPostAddress: RestPostAddress | null): Address => {
  return {
    address: restPostAddress?.address ?? undefined,
    postalCode: restPostAddress?.postal_code ?? undefined,
    city: restPostAddress?.city_name ?? undefined,
    country: restPostAddress?.country ?? undefined,
  }
}

const phoneNumber = (
  restPhoneNumber: RestPhoneNumber | null,
): PhoneNumber | undefined => {
  if (restPhoneNumber == null) return undefined

  let countryCode: CountryCode
  if (isCountryCode(restPhoneNumber.country)) {
    countryCode = restPhoneNumber.country
  } else {
    // by default
    countryCode = i18n.t('personalinformation.default_country_code')
  }
  return {
    countryCode: countryCode,
    number: restPhoneNumber.number,
  }
}
