import { EventMode, ShortEvent } from '../../core/entities/Event'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'
import { EventRowViewModel } from './EventViewModel'

const HOUR_MINUTE_FORMAT = 'HH:mm'

export const EventRowViewModelMapper = {
  map: (event: ShortEvent): EventRowViewModel => {
    return {
      id: event.uuid,
      title: event.name,
      category: event.category,
      isOnline: event.mode === EventMode.ONLINE,
      imageUrl: event.imageUrl,
      tag: event.tag,
      isSubscribed: event.userRegisteredAt !== undefined,
      day: mapDay(event),
      hour: mapHour(event),
      dateTimestamp: event.dateStart.getTime(),
    }
  },
}

function mapDay(event: ShortEvent): string {
  return DateFormatter.format(
    event.dateStart,
    i18n.t('events.event_date_format'),
  )
}

function mapHour(event: ShortEvent): string {
  return i18n.t('events.duration_formation', {
    start: DateFormatter.format(event.dateStart, HOUR_MINUTE_FORMAT),
    end: DateFormatter.format(event.dateEnd, HOUR_MINUTE_FORMAT),
  })
}
