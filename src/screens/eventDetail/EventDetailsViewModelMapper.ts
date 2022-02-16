import { DetailedEvent } from '../../core/entities/Event'
import i18n from '../../utils/i18n'
import {
  EventDateViewModel,
  EventDetailsViewModel,
  EventOrganizerViewModel,
} from './EventDetailsViewModel'
import { DateFormatter } from '../../utils/DateFormatter'

const DESCRIPTION_MAX_CHAR = 500

export const EventDetailsViewModelMapper = {
  map: (event: DetailedEvent, canSeeMore: boolean): EventDetailsViewModel => {
    return {
      id: event.uuid,
      title: event.name,
      tag: event.tag,
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
      description: mapDescription(event, canSeeMore),
      canSeeMore: isDescriptionTooLarge(event.description),
    }
  },
}

const isDescriptionTooLarge = (description: string) => {
  return description.length > DESCRIPTION_MAX_CHAR
}

function mapDescription(event: DetailedEvent, canSeeMore: boolean): string {
  if (isDescriptionTooLarge(event.description) && canSeeMore) {
    return event.description.substring(0, DESCRIPTION_MAX_CHAR) + '…'
  }
  return event.description
}

function mapDate(event: DetailedEvent): EventDateViewModel {
  const title = DateFormatter.format(
    event.dateStart,
    i18n.t('eventdetails.date_format'),
  )
  const description =
    DateFormatter.format(event.dateStart, HOUR_MINUTE_FORMAT) +
    ' - ' +
    DateFormatter.format(event.dateEnd, HOUR_MINUTE_FORMAT)
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
