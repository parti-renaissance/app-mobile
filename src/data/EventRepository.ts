import { DetailedEvent, EventFilters, ShortEvent } from '../core/entities/Event'
import { PaginatedResult } from '../core/entities/PaginatedResult'
import { EventMapper } from './mapper/EventMapper'
import { RestMetadataMapper } from './mapper/RestMetadataMapper'
import ApiService from './network/ApiService'

class EventRepository {
  private static instance: EventRepository
  private apiService = ApiService.getInstance()

  public async getEvents(
    zipCode: string,
    page: number,
    eventFilters?: EventFilters,
  ): Promise<PaginatedResult<Array<ShortEvent>>> {
    const restEvents = await this.apiService.getEvents(
      zipCode,
      page,
      eventFilters,
    )
    const paginationInfo = RestMetadataMapper.map(restEvents.metadata)
    return {
      paginationInfo: paginationInfo,
      result: restEvents.items.map(EventMapper.mapShortEvent),
    }
  }

  public async getMainEvents(
    zipCode: string,
    eventFilters?: EventFilters,
  ): Promise<PaginatedResult<Array<ShortEvent>>> {
    const restEvents = await this.apiService.getEvents(
      zipCode,
      1,
      eventFilters,
      true,
    )
    const paginationInfo = RestMetadataMapper.map(restEvents.metadata)
    return {
      paginationInfo: paginationInfo,
      result: restEvents.items.map(EventMapper.mapShortEvent),
    }
  }

  public async getEventDetails(eventId: string): Promise<DetailedEvent> {
    const restDetailedEvent = await this.apiService.getEventDetails(eventId)
    return EventMapper.mapDetailedEvent(restDetailedEvent)
  }

  public async subscribeToEvent(eventId: string): Promise<void> {
    return this.apiService.subscribeToEvent(eventId)
  }

  public async unsubscribeFromEvent(eventId: string): Promise<void> {
    return this.apiService.unsubscribeFromEvent(eventId)
  }

  public static getInstance(): EventRepository {
    if (!EventRepository.instance) {
      EventRepository.instance = new EventRepository()
    }
    return EventRepository.instance
  }
}

export default EventRepository
