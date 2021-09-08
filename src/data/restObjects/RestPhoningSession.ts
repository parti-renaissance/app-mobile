export interface RestPhoningSession {
  uuid: string
  adherent: RestPhoningSessionAdherent
}

export interface RestPhoningSessionAdherent {
  uuid: string
  gender: ('male' | 'female' | 'other') | null
  phone: {
    country: string
    number: string
  }
  first_name: string
  age: number | null
  city_name: string | null
  postal_code: string | null
}
