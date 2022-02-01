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
      tag: restShortEvent.category.event_group_category.name,
      name: restShortEvent.name,
      category: restShortEvent.category.event_group_category.slug,
      mode: mapMode(restShortEvent.mode),
      imageUrl: restShortEvent.image_url ?? undefined,
      dateStart: new Date(restShortEvent.begin_at),
      dateEnd: new Date(restShortEvent.finish_at),
      userRegisteredAt: userRegisteredAt,
    }
  },
  mapDetailedEvent: (restDetailedEvent: RestDetailedEvent): DetailedEvent => {
    const userRegisteredAt = restDetailedEvent.user_registered_at
      ? new Date(restDetailedEvent.user_registered_at)
      : undefined
    const address = mapAddress(restDetailedEvent.post_address)
    return {
      uuid: restDetailedEvent.uuid,
      tag: restDetailedEvent.category.event_group_category.name,
      description: restDetailedEvent.description,
      name: restDetailedEvent.name,
      mode: mapMode(restDetailedEvent.mode),
      imageUrl: restDetailedEvent.image_url ?? undefined,
      dateStart: new Date(restDetailedEvent.begin_at),
      dateEnd: new Date(restDetailedEvent.finish_at),
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
  postAddress: RestEventAddress | null | undefined,
): EventAddress | undefined {
  if (!postAddress) return undefined
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
  committee: RestEventComittee | null | undefined,
): Commitee | undefined {
  if (!committee) return undefined

  return {
    name: committee.name,
    url: committee.link,
  }
}
