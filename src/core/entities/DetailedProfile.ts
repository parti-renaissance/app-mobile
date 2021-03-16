import { CountryCode } from 'react-native-country-picker-modal'
import { Gender } from './UserProfile'

export interface DetailedProfile {
  uuid: string
  firstName: string
  lastName: string
  gender: Gender | undefined
  customGender: string | undefined
  nationality: CountryCode
  birthDate: Date | undefined
}
