import moment from 'moment'
import {
  Commitee,
  DetailedEvent,
  EventAddress,
  EventMode,
  ShortEvent,
} from '../../core/entities/Event'
import {
  RestDetailedEvent,
  RestEventAddress,
  RestEventComittee,
  RestShortEvent,
} from '../restObjects/RestEvents'

export const EventMapper = {
  mapShortEvent: (restShortEvent: RestShortEvent): ShortEvent => {
    const userRegisteredAt = restShortEvent.user_registered_at
      ? new Date(restShortEvent.user_registered_at)
      : undefined
    return {
      uuid: restShortEvent.uuid,
      tag: restShortEvent.category.name,
      name: restShortEvent.name,
      mode: mapMode(restShortEvent.mode),
      imageUrl: restShortEvent.image_url ?? undefined,
      dateStart: moment(restShortEvent.begin_at),
      dateEnd: moment(restShortEvent.finish_at),
      userRegisteredAt: userRegisteredAt,
    }
  },
  mapDetailedEvent: (restDetailedEvent: RestDetailedEvent): DetailedEvent => {
    const userRegisteredAt = restDetailedEvent.user_registered_at
      ? moment(restDetailedEvent.user_registered_at)
      : undefined
    const address = mapAddress(restDetailedEvent.post_address)
    return {
      uuid: restDetailedEvent.uuid,
      tag: restDetailedEvent.slug,
      description: restDetailedEvent.description,
      name: restDetailedEvent.name,
      mode: mapMode(restDetailedEvent.mode),
      imageUrl: restDetailedEvent.image_url ?? undefined,
      dateStart: moment(restDetailedEvent.begin_at),
      dateEnd: moment(restDetailedEvent.finish_at),
      userRegisteredAt: userRegisteredAt,
      participantsCount: restDetailedEvent.participants_count,
      visioUrl: restDetailedEvent.visio_url ?? undefined,
      organizer: {
        firstName: restDetailedEvent.organizer.first_name,
        lastName: restDetailedEvent.organizer.last_name,
      },
      address: address,
      commitee: mapCommitee(restDetailedEvent.committee),
    }
  },
}
function mapMode(mode: string): EventMode {
  switch (mode) {
    case 'meeting':
      return EventMode.MEETING
    default:
      return EventMode.ONLINE
  }
}
function mapAddress(
  postAddress: RestEventAddress | null,
): EventAddress | undefined {
  if (postAddress === null) return undefined
  return {
    address: postAddress.address,
    postalCode: postAddress.postal_code,
    city: postAddress.city_name,
    country: postAddress.country,
    longitude: postAddress.longitude,
    latitude: postAddress.latitude,
  }
}
function mapCommitee(committee: RestEventComittee): Commitee {
  return {
    name: committee.name,
    url: committee.url,
  }
}
