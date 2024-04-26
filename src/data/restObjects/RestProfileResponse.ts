export interface RestProfileResponse {
  first_name: string
  last_name: string
  uuid: string
  postal_code: string
  email_address: string
  cadre_access: boolean
  certified: boolean
  country: string
  detailed_roles: string[]
  email_subscribed: boolean
  nickname: string | null
  use_nickname: boolean
  tags: RestProfileTag[]
  surveys: {
    total: number
    last_month: number
  }
}

export type RestProfileTag = {
  label: string
  type: 'sympathisant' | 'adherent' | 'elu' | 'meeting_lille_09_03' | 'procuration'
}
