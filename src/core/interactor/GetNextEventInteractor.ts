import EventRepository from '../../data/EventRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { EventFilters, ShortEvent } from '../entities/Event'
import { DateProvider } from '../../utils/DateProvider'
import { isAfter, isBefore, isToday } from 'date-fns'

export class GetNextEventInteractor {
  private eventRepository = EventRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async execute(): Promise<ShortEvent | undefined> {
    const zipCode = await this.profileRepository.getZipCode()
    const page = 1
    const filters: EventFilters = {
      finishAfter: DateProvider.now(),
      subscribedOnly: true,
    }
    const events = await this.eventRepository.getEvents(zipCode, page, filters)
    let now = DateProvider.now()
    const sortedEvents = events.result
      .filter((event) => {
        const eventIsToday = isToday(event.dateStart)
        const eventEndIsLater = isAfter(event.dateEnd, now)
        return eventIsToday && eventEndIsLater
      })
      .sort((lhs, rhs) => (isBefore(lhs.dateStart, rhs.dateStart) ? -1 : 1))
    const shouldDisplayEvents = now.getHours() >= 7 // dislay events only after 7 a.m
    return shouldDisplayEvents ? sortedEvents[0] : undefined
  }
}
