import { EventMode, ShortEvent } from '../../core/entities/Event'
import { AddressFormatter } from '../../utils/AddressFormatter'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'
import { EventRowViewModel } from './EventViewModel'

const HOUR_MINUTE_FORMAT = 'HH:mm'

export const EventRowViewModelMapper = {
  map: (event: ShortEvent): EventRowViewModel => {
    const isOnline =
      event.mode === EventMode.ONLINE || event.address === undefined
    return {
      id: event.uuid,
      title: event.name,
      category: event.category,
      isOnline: event.mode === EventMode.ONLINE,
      formattedAddress:
        !isOnline && event.address // duplicate condition with isOnline, to ensure Typescript understands address is defined
          ? AddressFormatter.formatEventAddress(event.address)
          : i18n.t('eventdetails.online_event'),
      addressIcon: isOnline
        ? require('../../assets/images/eventOnlineIcon.png')
        : require('../../assets/images/eventAddressIcon.png'),
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
