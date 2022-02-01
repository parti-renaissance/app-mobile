import { DetailedEvent } from '../../core/entities/Event'
import i18n from '../../utils/i18n'
import {
  EventDateViewModel,
  EventDetailsViewModel,
  EventOrganizerViewModel,
} from './EventDetailsViewModel'
import { TagViewModelMapper } from './TagViewModelMapper'
import { CreateOptions } from 'react-native-add-calendar-event'
import { Platform } from 'react-native'
import { formatLocalizedDate } from '../../utils/DateFormatter'
import { format } from 'date-fns'

export const EventDetailsViewModelMapper = {
  map: (event: DetailedEvent): EventDetailsViewModel => {
    return {
      id: event.uuid,
      title: event.name,
      tag: TagViewModelMapper.map(event.tag),
      attendeesNumber: i18n.t('eventdetails.attendees', {
        attendees: event.participantsCount,
      }),
      onlineUrl: event.visioUrl,
      address: mapAddress(event),
      organizer: mapOrganizer(event),
      imageUrl: event.imageUrl,
      isSubscribed: event.userRegisteredAt !== undefined,
      date: mapDate(event),
      eventUrl: event.link,
      description: event.description,
      calendarEvent: createCalendarEvent(event),
    }
  },
}

function mapDate(event: DetailedEvent): EventDateViewModel {
  const title = formatLocalizedDate(
    event.dateStart,
    i18n.t('eventdetails.date_format'),
  )
  const description =
    formatLocalizedDate(event.dateStart, HOUR_MINUTE_FORMAT) +
    ' - ' +
    formatLocalizedDate(event.dateEnd, HOUR_MINUTE_FORMAT)
  return {
    title: title,
    description: description,
  }
}

const HOUR_MINUTE_FORMAT = 'HH:mm'
function mapAddress(event: DetailedEvent): string | undefined {
  const address = event.address
  if (address === undefined) return undefined

  return address.address + '\n' + address.postalCode + ' ' + address.city
}

function mapOrganizer(event: DetailedEvent): EventOrganizerViewModel {
  const fullName = i18n.t('profile.name', {
    firstName: event.organizer.firstName,
    lastName: event.organizer.lastName,
  })
  return {
    title: fullName,
    description: event.commitee?.name,
    openUrl: event.commitee?.url,
  }
}
function createCalendarEvent(event: DetailedEvent): CreateOptions {
  const address = event.address
    ? event.address.address +
      ', ' +
      event.address.postalCode +
      ' ' +
      event.address.city
    : undefined
  return {
    title: event.name,
    startDate: event.dateStart.toISOString(),
    endDate: event.dateEnd.toISOString(),
    url: event.visioUrl, // ios only
    location: address,
    notes: Platform.OS === 'android' ? event.visioUrl : undefined,
  }
}
