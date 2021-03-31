export interface EventDetailsViewModel {
  id: string
  title: string
  tag: string
  tagBackgroundColor: string
  tagTextColor: string
  attendeesNumber: string
  onlineUrl?: string
  address?: EventAddressViewModel
  imageUrl?: string
  isSubscribed: boolean
  date: EventDateViewModel
  eventUrl?: string
  description: string
}

export interface EventAddressViewModel {
  title: string
  description: string
}

export interface EventDateViewModel {
  title: string
  description: string
}
