import {
  EventRowContainerViewModel,
  EventRowViewModel,
  EventSectionRowViewModel,
  EventSectionViewModel,
} from './EventViewModel'
import { EventMode, ShortEvent } from '../../core/entities/Event'
import { EventFilter } from './EventListScreen'
import MultiMap from 'mnemonist/multi-map'
import { Moment } from 'moment'
import moment from 'moment'
import i18n from '../../utils/i18n'
import { TagViewModelMapper } from './TagViewModelMapper'

export const EventViewModelMapper = {
  map: (
    events: Array<ShortEvent>,
    _: EventFilter,
  ): Array<EventSectionViewModel> => {
    const multiMap = new MultiMap<string, ShortEvent>()
    events.forEach((event) => {
      const sectionKey = extractSectionKey(event.dateStart)
      multiMap.set(sectionKey, event)
    })
    const result: Array<EventSectionViewModel> = []
    let keys = new Array(...multiMap.keys())
    keys = keys.sort()
    for (const key of keys) {
      const eventsOfSection = multiMap.get(key) ?? []
      const sectionViewModel = mapSection(key, eventsOfSection[0])
      const eventsViewModel: Array<EventRowContainerViewModel> = eventsOfSection.map(
        (event) => {
          return {
            type: 'event',
            value: mapEvent(event),
          }
        },
      )
      result.push({
        id: key,
        sectionViewModel: sectionViewModel,
        data: eventsViewModel,
      })
    }
    return result
  },
}

function extractSectionKey(sectionTime: Moment): string {
  return sectionTime.format('YYYYMMDD')
}
function mapEvent(event: ShortEvent): EventRowViewModel {
  return {
    id: event.uuid,
    title: event.name,
    isOnline: event.mode === EventMode.ONLINE,
    imageUrl: event.imageUrl,
    tag: TagViewModelMapper.map(event.tag),
    isSubscribed: event.userRegisteredAt !== undefined,
    date: mapDate(event),
  }
}
function mapDate(event: ShortEvent): string {
  return (
    event.dateStart.format(HOUR_MINUTE_FORMAT) +
    ' - ' +
    event.dateEnd.format(HOUR_MINUTE_FORMAT)
  )
}

const HOUR_MINUTE_FORMAT = 'HH:mm'
function mapSection(
  key: string,
  firstEvent: ShortEvent,
): EventSectionRowViewModel {
  const now = moment()
  const isToday = key === extractSectionKey(now)
  const name = isToday
    ? i18n.t('events.section_date_today')
    : firstEvent.dateStart.format(i18n.t('events.section_date_format'))
  return {
    sectionName: name,
  }
}
