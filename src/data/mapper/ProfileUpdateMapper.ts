import { PersonalInformationsForm } from '../../core/entities/PersonalInformationsForm'
import {
  RestUpdatePhoneNumber,
  RestUpdatePostAddress,
  RestUpdateProfileRequest,
} from '../restObjects/RestUpdateProfileRequest'
import { GenderMapper } from './GenderMapper'
import moment from 'moment'

export const ProfileUpdateMapper = {
  mapPersonalInformationForm: (
    profile: PersonalInformationsForm,
  ): RestUpdateProfileRequest => {
    let phone: RestUpdatePhoneNumber | null
    if (profile.phoneNumber) {
      phone = {
        country: profile.phoneNumber.countryCode,
        number: profile.phoneNumber.number,
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
    const birthDate = profile.birthdate
      ? moment(profile.birthdate).format('YYYY-MM-DD')
      : null
    return {
      first_name: profile.firstName,
      last_name: profile.lastName,
      gender: GenderMapper.mapFromGender(profile.gender),
      custom_gender: profile.customGender ?? null,
      birthdate: birthDate,
      nationality: profile.countryCode,
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
