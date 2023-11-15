export interface RestSignUpRequest {
  email_address: string
  first_name: string
  last_name: string
  gender: string
  birthdate: string
  phone: string
  address: RestSignUpAddress
  cgu_accepted: boolean
  allow_mobile_notifications: boolean
  allow_email_notifications: boolean
}

export interface RestSignUpAddress {
  address: string
  postal_code: string
  city_name: string
  country: string
}

export interface RestSignUpErrorResponse {
  violations: Array<RestSignUpViolation>
}

export interface RestSignUpViolation {
  propertyPath: string
  title: string
}
