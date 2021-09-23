export interface PhoningSessionAdherent {
  id: string
  info: string
  phone: {
    country: string
    number: string
  }
  gender?: 'male' | 'female' | 'other'
}
