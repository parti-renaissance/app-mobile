import * as AddCalendarEvent from 'react-native-add-calendar-event'
import { PollRowViewModel } from '../polls/PollRowViewModel'
import { TagViewModel } from './TagViewModel'

export interface EventDetailsViewModel {
  id: string
  title: string
  tag: TagViewModel
  attendeesNumber: string
  onlineUrl?: string
  address?: string
  organizer?: EventOrganizerViewModel
  imageUrl?: string
  isSubscribed: boolean
  date: EventDateViewModel
  eventUrl?: string
  description: string
  calendarEvent: AddCalendarEvent.CreateOptions
  survey?: PollRowViewModel
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
