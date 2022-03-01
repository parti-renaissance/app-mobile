import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { DateFormatter } from '../../../../utils/DateFormatter'
import i18n from '../../../../utils/i18n'
import { EventRowViewModel } from '../../../events/EventViewModel'
import { logWarningsIfNeeded } from './logWarningsIfNeeded'

export const EventRowViewModelFromTimelineEventMapper = {
  map: (item: TimelineFeedItem): EventRowViewModel => {
    const category = item.category ?? ''
    const beginAt = item.beginAt ?? new Date()
    const finishAt = item.finishAt ?? new Date()
    logWarningsIfNeeded(item, ['category', 'beginAt', 'finishAt'])

    return {
      id: item.uuid,
      title: item.title,
      category: category,
      isOnline: false, // TODO: (Pierre Felgines) 2022/02/28 Find this info in webservice
      imageUrl: item.imageUri,
      tag: category,
      isSubscribed: false,
      day: DateFormatter.format(beginAt, i18n.t('events.event_date_format')),
      hour: i18n.t('events.duration_formation', {
        start: DateFormatter.format(beginAt, HOUR_MINUTE_FORMAT),
        end: DateFormatter.format(finishAt, HOUR_MINUTE_FORMAT),
      }),
      dateTimestamp: beginAt.getTime(),
    }
  },
}

const HOUR_MINUTE_FORMAT = 'HH:mm'
