import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { DateFormatter } from '../../../../utils/DateFormatter'
import i18n from '../../../../utils/i18n'
import { EventRowViewModel } from '../../../events/EventViewModel'

export const EventRowViewModelFromTimelineEventMapper = {
  map: (item: TimelineFeedItem): EventRowViewModel => {
    return {
      id: item.uuid,
      title: item.title,
      category: item.category ?? '',
      isOnline: false,
      imageUrl: item.imageUri,
      tag: item.category ?? '',
      isSubscribed: false,
      day: DateFormatter.format(
        item.beginAt ?? new Date(),
        i18n.t('events.event_date_format'),
      ),
      hour: i18n.t('events.duration_formation', {
        start: DateFormatter.format(
          item.beginAt ?? new Date(),
          HOUR_MINUTE_FORMAT,
        ),
        end: DateFormatter.format(
          item.finishAt ?? new Date(),
          HOUR_MINUTE_FORMAT,
        ),
      }),
      dateTimestamp: (item.beginAt ?? new Date()).getTime(),
    }
  },
}

const HOUR_MINUTE_FORMAT = 'HH:mm'
