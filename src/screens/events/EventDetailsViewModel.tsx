import * as AddCalendarEvent from 'react-native-add-calendar-event'
import { PollRowViewModel } from '../polls/PollRowViewModel'

export interface EventDetailsViewModel {
  id: string
  title: string
  tag: string
  tagBackgroundColor: string
  tagTextColor: string
  attendeesNumber: string
  onlineUrl?: string
  address?: EventAddressViewModel
  organizer?: EventOrganizerViewModel
  imageUrl?: string
  isSubscribed: boolean
  date: EventDateViewModel
  eventUrl?: string
  description: string
  calendarEvent: AddCalendarEvent.CreateOptions
  survey?: PollRowViewModel
}

export interface EventAddressViewModel {
  title: string
  description: string
}

export interface EventDateViewModel {
  title: string
  description: string
}

export interface EventOrganizerViewModel {
  title: string
  description: string
  openUrl: string
}

export interface EventDescriptionViewModel {
  description: string
  canSeeMore: boolean
}
