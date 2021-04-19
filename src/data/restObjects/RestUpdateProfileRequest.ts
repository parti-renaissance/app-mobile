export interface RestUpdateProfileRequest {
  first_name: string
  last_name: string
  gender: string
  custom_gender: string | null
  nationality: string
  birthdate: string | null
  address: RestUpdatePostAddress | null
  email_address: string
  facebook_page_url: string
  twitter_page_url: string
  linkedin_page_url: string
  telegram_page_url: string
  phone: RestUpdatePhoneNumber | null
}

export interface RestUpdatePostAddress {
  address: string
  postal_code: string
  city_name: string
  country: string
}

export interface RestUpdatePhoneNumber {
  country: string
  number: string
}

export interface RestUpdateErrorResponse {
  violations: Array<RestViolation>
}

export interface RestViolation {
  propertyPath: string
  message: string
}

export interface RestUpdateCentersOfInterestRequest {
  interests: Array<string>
}
