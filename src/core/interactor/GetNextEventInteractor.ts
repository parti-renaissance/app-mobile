import EventRepository from '../../data/EventRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { EventFilters, ShortEvent } from '../entities/Event'
import { DateProvider } from '../../utils/DateProvider'
import moment from 'moment'

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
    let now = moment(DateProvider.now())
    const sortedEvents = events.result
      .filter((event) => {
        const eventIsToday = event.dateStart.isSame(now, 'day')
        const eventEndIsLater = event.dateEnd.isAfter(now)
        return eventIsToday && eventEndIsLater
      })
      .sort((lhs, rhs) => (lhs.dateStart.isBefore(rhs.dateStart) ? -1 : 1))
    const shouldDisplayEvents = now.hour() >= 7 // dislay events only after 7 a.m
    return shouldDisplayEvents ? sortedEvents[0] : undefined
  }
}
