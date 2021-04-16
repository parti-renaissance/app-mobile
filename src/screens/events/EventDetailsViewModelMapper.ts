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
  const title = event.dateStart.format(i18n.t('eventdetails.date_format'))
  const description =
    event.dateStart.format(HOUR_MINUTE_FORMAT) +
    ' - ' +
    event.dateEnd.format(HOUR_MINUTE_FORMAT)
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

function mapOrganizer(
  event: DetailedEvent,
): EventOrganizerViewModel | undefined {
  const fullName = i18n.t('profile.name', {
    firstName: event.organizer.firstName,
    lastName: event.organizer.lastName,
  })
  return {
    title: fullName,
    description: event.commitee.name,
    openUrl: event.commitee.url,
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
    startDate: event.dateStart.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    endDate: event.dateEnd.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    url: event.visioUrl, // ios only
    location: address,
    notes: Platform.OS === 'android' ? event.visioUrl : undefined,
  }
}
