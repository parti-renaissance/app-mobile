import moment from 'moment'
import { EventMode, ShortEvent } from '../../core/entities/Event'
import { RestShortEvent } from '../restObjects/RestEvents'

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
}
function mapMode(mode: string): EventMode {
  switch (mode) {
    case 'meeting':
      return EventMode.MEETING
    default:
      return EventMode.ONLINE
  }
}
