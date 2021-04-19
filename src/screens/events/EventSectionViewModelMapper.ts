import {
  EventRowContainerViewModel,
  EventSectionRowViewModel,
  EventSectionViewModel,
} from './EventViewModel'
import { ShortEvent } from '../../core/entities/Event'
import { EventFilter } from './EventListScreen'
import MultiMap from 'mnemonist/multi-map'
import { Moment } from 'moment'
import moment from 'moment'
import i18n from '../../utils/i18n'
import { EventRowViewModelMapper } from './EventRowViewModelMapper'

export const EventSectionViewModelMapper = {
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
            value: EventRowViewModelMapper.map(event),
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
