import {
  EventRowContainerViewModel,
  EventRowViewModel,
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
    filter: EventFilter,
  ): Array<EventSectionViewModel> => {
    if (filter === 'home') {
      return mapHome(events)
    } else {
      return mapCalendar(events)
    }
  },
}

function mapCalendar(events: ShortEvent[]): EventSectionViewModel[] {
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
          value: EventRowViewModelMapper.map(event, 'hour'),
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
}

function mapHome(events: ShortEvent[]): EventSectionViewModel[] {
  const multiMap = new MultiMap<string, ShortEvent>()
  events.forEach((event) => {
    const sectionKey = event.tag
    multiMap.set(sectionKey, event)
  })
  const result: Array<EventSectionViewModel> = []
  const keys = new Array(...multiMap.keys())
  for (const key of keys) {
    const eventsOfSection = multiMap.get(key) ?? []
    const sectionViewModel = mapHomeSection(eventsOfSection[0])
    const eventViewModels: Array<EventRowViewModel> = eventsOfSection.map(
      (event) => {
        return EventRowViewModelMapper.map(event, 'day_hour')
      },
    )
    eventViewModels.sort((event1, event2) => {
      return event1.dateTimestamp - event2.dateTimestamp
    })
    const eventContainerViewModel: EventRowContainerViewModel = {
      type: 'grouped',
      value: {
        events: eventViewModels,
      },
    }
    result.push({
      id: key,
      sectionViewModel: sectionViewModel,
      data: [eventContainerViewModel],
    })
  }
  return result
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

function mapHomeSection(firstEvent: ShortEvent): EventSectionRowViewModel {
  return {
    sectionName: firstEvent.tag,
  }
}
