import { EventMode, ShortEvent } from '../../core/entities/Event'
import { EventRowViewModel } from './EventViewModel'
import { TagViewModelMapper } from './TagViewModelMapper'

const HOUR_MINUTE_FORMAT = 'HH:mm'

export const EventRowViewModelMapper = {
  map: (event: ShortEvent): EventRowViewModel => {
    return {
      id: event.uuid,
      title: event.name,
      isOnline: event.mode === EventMode.ONLINE,
      imageUrl: event.imageUrl,
      tag: TagViewModelMapper.map(event.tag),
      isSubscribed: event.userRegisteredAt !== undefined,
      date: mapDate(event),
    }
  },
}

function mapDate(event: ShortEvent): string {
  return (
    event.dateStart.format(HOUR_MINUTE_FORMAT) +
    ' - ' +
    event.dateEnd.format(HOUR_MINUTE_FORMAT)
  )
}
