import EventRepository from "../../data/EventRepository";
import ProfileRepository from "../../data/ProfileRepository";
import { EventFilters, ShortEvent } from "../entities/Event";
import { PaginatedResult } from "../entities/PaginatedResult";

export class GetEventsInteractor {
  private eventRepository = EventRepository.getInstance();
  private profileRepository = ProfileRepository.getInstance();

  public async execute(
    page: number,
    filters?: EventFilters,
  ): Promise<PaginatedResult<Array<ShortEvent>>> {
    const zipCode = await this.profileRepository.getZipCode();
    return this.eventRepository.getEvents(zipCode, page, filters);
  }
}
