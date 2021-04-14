import { ShortEvent } from '../core/entities/Event'
import { EventMapper } from './mapper/EventMapper'
import ApiService from './network/ApiService'

class EventRepository {
  private static instance: EventRepository
  private apiService = ApiService.getInstance()

  public async getEvents(page: number): Promise<Array<ShortEvent>> {
    const restEvents = await this.apiService.getEvents(page)
    return restEvents.items.map(EventMapper.mapShortEvent)
  }

  public static getInstance(): EventRepository {
    if (!EventRepository.instance) {
      EventRepository.instance = new EventRepository()
    }
    return EventRepository.instance
  }
}

export default EventRepository
