import { Address, PhoneNumber } from './DetailedProfile'
import { Gender } from './UserProfile'

export interface SignUpFormData {
  firstName: string
  lastName: string
  gender: Gender
  mail: string
  notificationMail: boolean
  notificationSms: boolean
  birthDate: Date | undefined
  phone: PhoneNumber
  address: Address | undefined
  gcuAccepted: boolean
}
