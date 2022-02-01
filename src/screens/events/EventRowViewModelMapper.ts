import { EventMode, ShortEvent } from '../../core/entities/Event'
import i18n from '../../utils/i18n'
import { EventRowViewModel } from './EventViewModel'
import { TagViewModelMapper } from './TagViewModelMapper'

const HOUR_MINUTE_FORMAT = 'HH:mm'

type EventDateFormat = 'hour' | 'day_hour'

export const EventRowViewModelMapper = {
  map: (event: ShortEvent, dateFormat: EventDateFormat): EventRowViewModel => {
    return {
      id: event.uuid,
      title: event.name,
      category: event.category,
      isOnline: event.mode === EventMode.ONLINE,
      imageUrl: event.imageUrl,
      tag: TagViewModelMapper.map(event.tag),
      isSubscribed: event.userRegisteredAt !== undefined,
      date: mapDate(event, dateFormat),
      dateTimestamp: event.dateStart.unix(),
    }
  },
}

function mapDate(event: ShortEvent, dateFormat: EventDateFormat): string {
  let date = ''
  if (dateFormat === 'day_hour') {
    date += event.dateStart.format(i18n.t('events.event_date_format'))
    date += '\n'
  }
  date +=
    event.dateStart.format(HOUR_MINUTE_FORMAT) +
    ' - ' +
    event.dateEnd.format(HOUR_MINUTE_FORMAT)
  return date
}
