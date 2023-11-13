import { Address } from "../../core/entities/DetailedProfile";
import { Gender } from "../../core/entities/UserProfile";

export interface PersonalInformationsForm {
  firstName: string;
  lastName: string;
  gender: Gender;
  customGender: string | undefined;
  countryCode: string;
  birthdate: Date;
  address: Address | undefined;
  email: string;
  phoneNumber: string;
  phoneCountryCode: string;
  facebook: string | undefined;
  twitter: string | undefined;
  linkedin: string | undefined;
  telegram: string | undefined;
}
