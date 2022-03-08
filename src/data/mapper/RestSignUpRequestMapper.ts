import { format } from 'date-fns'
import { SignUpFormData } from '../../core/entities/SignUpFormData'
import { CountryRepository } from '../CountryRepository'
import { RestSignUpRequest } from '../restObjects/RestSignUpRequest'
import { GenderMapper } from './GenderMapper'

export const RestSignUpRequestMapper = {
  map: (data: SignUpFormData): RestSignUpRequest => {
    return {
      email_address: data.mail,
      first_name: data.firstName,
      last_name: data.lastName,
      gender: GenderMapper.mapFromGender(data.gender),
      birthdate: data.birthDate ? format(data.birthDate, 'yyyy-MM-dd') : '',
      phone: PhoneNumberMapper.mapToString(
        data.phoneNumber,
        data.phoneCountryCode,
      ),
      address: {
        address: data?.address?.address ?? '',
        city_name: data?.address?.city ?? '',
        country: data?.address?.country ?? '',
        postal_code: data?.address?.postalCode ?? '',
      },
      cgu_accepted: data.gcuAccepted,
      allow_mobile_notifications: data.notificationSms,
      allow_email_notifications: data.notificationMail,
    }
  },
}

export const PhoneNumberMapper = {
  mapToString: (phoneNumber: string, countryCode: string): string => {
    if (phoneNumber.startsWith('0')) {
      return phoneNumber
    } else {
      const callingCode = CountryRepository.getInstance().getCallingCodeForCountryCode(
        countryCode,
      )
      return callingCode + phoneNumber
    }
  },
}
