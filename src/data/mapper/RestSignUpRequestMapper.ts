import { format } from 'date-fns'
import { PhoneNumber } from '../../core/entities/DetailedProfile'
import { SignUpFormData } from '../../core/entities/SignUpFormData'
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
      phone: PhoneNumberMapper.mapToString(data.phone),
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
  mapToString: (phoneNumber: PhoneNumber): string => {
    if (phoneNumber.number.startsWith('0')) {
      return phoneNumber.number
    } else {
      return phoneNumber.callingCode + phoneNumber.number
    }
  },
}
