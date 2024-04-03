export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface Address {
  address: string | undefined
  postalCode: string | undefined
  city: string | undefined
  country: string | undefined
}

export interface PersonalInformationsForm {
  firstName: string
  lastName: string
  gender: Gender
  customGender: string | undefined
  nationality: string
  birthdate: Date
  address: Address | undefined
  email: string
  phoneNumber: string
  phoneCountryCode: string
  facebook: string | undefined
  twitter: string | undefined
  instagram: string | undefined
  linkedin: string | undefined
  telegram: string | undefined
}
