import PaginatedResult from '../core/entities/PaginatedResult'
import { TimelineFeedItem } from '../core/entities/TimelineFeedItem'
import { TimelineFeedItemMapper } from './mapper/TimelineFeedItemMapper'
import ApiService from './network/ApiService'

export class TimelineFeedRepository {
  private static instance: TimelineFeedRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getTimelineFeed(
    page: number = 0,
    zipCode: string,
  ): Promise<PaginatedResult<Array<TimelineFeedItem>>> {
    const restTimelineFeed = await this.apiService.getTimelineFeed(
      page,
      zipCode,
    )
    const items = restTimelineFeed.hits.map(TimelineFeedItemMapper.map)
    return {
      paginationInfo: {
        currentPage: restTimelineFeed.page,
        lastPage: restTimelineFeed.nbPages - 1,
      },
      result: items,
    }
  }

  public static getInstance(): TimelineFeedRepository {
    if (!TimelineFeedRepository.instance) {
      TimelineFeedRepository.instance = new TimelineFeedRepository()
    }
    return TimelineFeedRepository.instance
  }
}
