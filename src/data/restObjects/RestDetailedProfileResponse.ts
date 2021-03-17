export interface RestDetailedProfileResponse {
  uuid: string
  first_name: string
  last_name: string
  gender: string
  custom_gender: string | null
  nationality: string
  birthdate: string | null
  post_address: RestPostAddress
  email_address: string | null
  facebook_page_url: string | null
  twitter_page_url: string | null
  linkedin_page_url: string | null
  telegram_page_url: string | null
}

export interface RestPostAddress {
  address: string | null
  postal_code: string | null
  city: string | null
  city_name: string | null
  region: string | null
  country: string | null
}
