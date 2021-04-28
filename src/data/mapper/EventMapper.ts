import moment from 'moment-timezone'
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
      ? moment(restShortEvent.user_registered_at).tz(restShortEvent.time_zone)
      : undefined
    return {
      uuid: restShortEvent.uuid,
      tag: restShortEvent.category.event_group_category.name,
      name: restShortEvent.name,
      mode: mapMode(restShortEvent.mode),
      imageUrl: restShortEvent.image_url ?? undefined,
      dateStart: moment(restShortEvent.begin_at).tz(restShortEvent.time_zone),
      dateEnd: moment(restShortEvent.finish_at).tz(restShortEvent.time_zone),
      userRegisteredAt: userRegisteredAt,
    }
  },
  mapDetailedEvent: (restDetailedEvent: RestDetailedEvent): DetailedEvent => {
    const timeZone = restDetailedEvent.time_zone
    const userRegisteredAt = restDetailedEvent.user_registered_at
      ? moment(restDetailedEvent.user_registered_at).tz(timeZone)
      : undefined
    const address = mapAddress(restDetailedEvent.post_address)
    return {
      uuid: restDetailedEvent.uuid,
      tag: restDetailedEvent.category.event_group_category.name,
      description: restDetailedEvent.description,
      name: restDetailedEvent.name,
      mode: mapMode(restDetailedEvent.mode),
      imageUrl: restDetailedEvent.image_url ?? undefined,
      dateStart: moment(restDetailedEvent.begin_at).tz(timeZone),
      dateEnd: moment(restDetailedEvent.finish_at).tz(timeZone),
      userRegisteredAt: userRegisteredAt,
      participantsCount: restDetailedEvent.participants_count,
      visioUrl: restDetailedEvent.visio_url ?? undefined,
      organizer: {
        firstName: restDetailedEvent.organizer.first_name,
        lastName: restDetailedEvent.organizer.last_name,
      },
      address: address,
      commitee: mapCommitee(restDetailedEvent.committee),
      timezone: restDetailedEvent.time_zone,
      link: restDetailedEvent.link,
    }
  },
}
function mapMode(mode: string | null): EventMode | undefined {
  switch (mode) {
    case 'meeting':
      return EventMode.MEETING
    case 'online':
      return EventMode.ONLINE
    default:
      return undefined
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
function mapCommitee(
  committee: RestEventComittee | null,
): Commitee | undefined {
  if (committee === null) return undefined

  return {
    name: committee.name,
    url: committee.link,
  }
}
