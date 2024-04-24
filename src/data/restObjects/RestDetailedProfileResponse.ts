import { RestInterestConfiguration, RestSubscriptionTypeConfiguration } from './RestConfigurations'

export interface RestDetailedProfileResponse {
  uuid: string
  first_name: string
  last_name: string
  gender: string
  custom_gender: string | null
  nationality: string | null
  birthdate: string
  post_address: RestPostAddress | null
  email_address: string
  facebook_page_url: string | null
  twitter_page_url: string | null
  linkedin_page_url: string | null
  telegram_page_url: string | null
  instagram_page_url: string | null
  adherent: boolean
  phone: RestPhoneNumber
  interests: Array<RestInterestConfiguration>
  subscription_types: Array<RestSubscriptionTypeConfiguration>
}

export interface RestPostAddress {
  address: string | null
  postal_code: string | null
  city: string | null
  city_name: string | null
  region: string | null
  country: string | null
}

export interface RestPhoneNumber {
  country: string
  number: string
}
