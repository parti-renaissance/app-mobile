import PaginatedResult from '../core/entities/PaginatedResult'
import { TimelineFeedItem } from '../core/entities/TimelineFeedItem'
import { TimelineFeedItemMapper } from './mapper/TimelineFeedItemMapper'
import ApiService from './network/ApiService'

export class HomeRepository {
  private static instance: HomeRepository
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

  public static getInstance(): HomeRepository {
    if (!HomeRepository.instance) {
      HomeRepository.instance = new HomeRepository()
    }
    return HomeRepository.instance
  }
}
