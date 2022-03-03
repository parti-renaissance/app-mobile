export interface EventDetailsViewModel {
  id: string
  title: string
  tag: string
  attendeesNumber: string
  onlineUrl?: string
  address?: string
  organizer: EventOrganizerViewModel
  imageUrl?: string
  isSubscribed: boolean
  date: EventDateViewModel
  eventUrl?: string
  canShare: boolean
  description: string
  canSeeMore: boolean
}

export interface EventDateViewModel {
  title: string
  description: string
}

export interface EventOrganizerViewModel {
  title: string
  description?: string
  openUrl?: string
  isPressable: boolean
}
