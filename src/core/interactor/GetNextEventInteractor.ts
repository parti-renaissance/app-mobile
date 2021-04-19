import EventRepository from '../../data/EventRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { EventFilters, ShortEvent } from '../entities/Event'
import { DateProvider } from '../../utils/DateProvider'

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
    return events.result[0]
  }
}
