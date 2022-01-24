export interface RestProfileResponse {
  first_name: string
  last_name: string
  uuid: string
  postal_code: string
  surveys: {
    total: number
    last_month: number
  }
}
