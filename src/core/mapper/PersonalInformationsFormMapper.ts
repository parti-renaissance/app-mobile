import { DetailedProfile } from '../entities/DetailedProfile'
import { PersonalInformationsForm } from '../entities/PersonalInformationsForm'

export const PersonalInformationsFormMapper = {
  mapFromDetailedProfile: (
    detailedProfile: DetailedProfile,
  ): PersonalInformationsForm => {
    return {
      firstName: detailedProfile.firstName,
      lastName: detailedProfile.lastName,
      gender: detailedProfile.gender,
      customGender: detailedProfile.customGender,
      countryCode: detailedProfile.nationality,
      birthdate: detailedProfile.birthDate,
      address: detailedProfile.address,
      email: detailedProfile.email,
      phoneNumber: detailedProfile.phone,
      facebook: detailedProfile.facebook,
      twitter: detailedProfile.twitter,
      linkedin: detailedProfile.linkedin,
      telegram: detailedProfile.telegram,
    }
  },
}
