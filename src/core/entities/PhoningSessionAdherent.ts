export interface PhoningSessionAdherent {
  id: string
  firstName: string
  phone: {
    country: string
    number: string
  }
  gender?: 'male' | 'female' | 'other'
  age?: number
  city?: string
  postalCode?: string
}
