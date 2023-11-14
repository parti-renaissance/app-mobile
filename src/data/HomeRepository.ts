import { HeaderInfos } from '../core/entities/HeaderInfos'
import { PaginatedResult } from '../core/entities/PaginatedResult'
import { TimelineFeedItem } from '../core/entities/TimelineFeedItem'
import { DataSource } from './DataSource'
import { HeaderInfosMapper } from './mapper/HeaderInfosMapper'
import { TimelineFeedItemMapper } from './mapper/TimelineFeedItemMapper'
import ApiService from './network/ApiService'
import { RestHeaderInfos } from './restObjects/RestHeaderInfos'
import CacheManager from './store/CacheManager'

export class HomeRepository {
  private static instance: HomeRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getTimelineFeed(
    page: number = 0,
    zipCode: string,
  ): Promise<PaginatedResult<Array<TimelineFeedItem>>> {
    const restTimelineFeed = await this.apiService.getTimelineFeed(
      page,
      zipCode,
    )
    const items = restTimelineFeed.hits
      .map(TimelineFeedItemMapper.map)
      // trick to filter undefined values and keep Typescript happy
      // https://www.benmvp.com/blog/filtering-undefined-elements-from-array-typescript/
      .filter((item): item is TimelineFeedItem => item !== undefined)
    return {
      paginationInfo: {
        currentPage: restTimelineFeed.page,
        lastPage: restTimelineFeed.nbPages - 1,
      },
      result: items,
    }
  }

  public async getHomeHeader(
    dataSource: DataSource = 'remote',
  ): Promise<HeaderInfos> {
    const cacheKey = 'homeHeader'
    let result: RestHeaderInfos
    switch (dataSource) {
      case 'cache':
        result = await this.cacheManager.getFromCache(cacheKey)
        break
      case 'remote':
        result = await await this.apiService.getHomeHeader()
        await this.cacheManager.setInCache(cacheKey, result)
        break
    }
    return HeaderInfosMapper.map(result)
  }

  public static getInstance(): HomeRepository {
    if (!HomeRepository.instance) {
      HomeRepository.instance = new HomeRepository()
    }
    return HomeRepository.instance
  }
}
