import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { DateFormatter } from '../../../../utils/DateFormatter'
import i18n from '../../../../utils/i18n'
import { EventRowViewModel } from '../../../events/EventViewModel'
import { logWarningsIfNeeded } from './logWarningsIfNeeded'

const formatDay = (date: Date | undefined): string => {
  if (date === undefined) {
    return ''
  }
  return DateFormatter.format(date, i18n.t('events.event_date_format'))
}

const formatHour = (start: Date | undefined, end: Date | undefined): string => {
  if (start === undefined || end === undefined) {
    return ''
  }
  return i18n.t('events.duration_formation', {
    start: DateFormatter.format(start, HOUR_MINUTE_FORMAT),
    end: DateFormatter.format(end, HOUR_MINUTE_FORMAT),
  })
}

export const EventRowViewModelFromTimelineEventMapper = {
  map: (item: TimelineFeedItem): EventRowViewModel => {
    const category = item.category ?? ''
    logWarningsIfNeeded(item, ['category', 'beginAt', 'finishAt'])

    const isOnline = item.address === undefined

    return {
      id: item.uuid,
      title: item.title,
      isOnline: isOnline,
      formattedAddress: !isOnline
        ? item.address ?? ''
        : i18n.t('eventdetails.online_event'),
      addressIcon: !isOnline
        ? require('../../../../assets/images/eventAddressIcon.png')
        : require('../../../../assets/images/eventOnlineIcon.png'),
      imageUrl: item.imageUri,
      tag: category,
      isSubscribed: false,
      day: formatDay(item.beginAt),
      hour: formatHour(item.beginAt, item.finishAt),
      dateTimestamp: item.beginAt?.getTime() ?? 0,
    }
  },
}

const HOUR_MINUTE_FORMAT = 'HH:mm'
