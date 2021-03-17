export interface RestDetailedProfileResponse {
  uuid: string
  first_name: string
  last_name: string
  gender: string
  custom_gender: string | null
  nationality: string
  birthdate: string | null
  post_address: RestPostAddress
}

export interface RestPostAddress {
  address: string | null
  postal_code: string | null
  city: string | null
  city_name: string | null
  region: string | null
  country: string | null
}
