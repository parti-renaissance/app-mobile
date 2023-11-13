import { DetailedProfile } from "../../core/entities/DetailedProfile";
import { PersonalInformationsForm } from "./PersonalInformationsForm";

export const PersonalInformationsFormMapper = {
  map: (detailedProfile: DetailedProfile): PersonalInformationsForm => {
    return {
      firstName: detailedProfile.firstName,
      lastName: detailedProfile.lastName,
      gender: detailedProfile.gender,
      customGender: detailedProfile.customGender,
      countryCode: detailedProfile.nationality,
      birthdate: detailedProfile.birthDate,
      address: detailedProfile.address,
      email: detailedProfile.email,
      phoneNumber: detailedProfile.phone?.number ?? "",
      phoneCountryCode: detailedProfile.phone?.countryCode ?? "FR",
      facebook: detailedProfile.facebook,
      twitter: detailedProfile.twitter,
      linkedin: detailedProfile.linkedin,
      telegram: detailedProfile.telegram,
    };
  },
};
