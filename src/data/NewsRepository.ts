import { News } from '../core/entities/News'
import ApiService from './network/ApiService'
import { RestNewsMapper } from './mapper/RestNewsMapper'
import PaginatedResult from '../core/entities/PaginatedResult'
import { RestMetadataMapper } from './mapper/RestMetadataMapper'
import CacheManager from './store/CacheManager'
import { DataSource } from './DataSource'
import { RestNewsResponse } from './restObjects/RestNewsResponse'

const firstPage = 1

class NewsRepository {
  private static instance: NewsRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getLatestNews(
    dataSource: DataSource = 'remote',
  ): Promise<Array<News>> {
    const cacheKey = 'latest_news'
    let restNews: RestNewsResponse
    switch (dataSource) {
      case 'cache':
        restNews = await this.cacheManager.getFromCache(cacheKey)
        break
      case 'remote':
        restNews = await this.apiService.getNews(firstPage)
        await this.cacheManager.setInCache(cacheKey, restNews)
        break
    }
    return restNews.items.map(RestNewsMapper.map)
  }

  public async getNews(page: number): Promise<PaginatedResult<Array<News>>> {
    const restNews = await this.apiService.getNews(page)
    const paginationInfo = RestMetadataMapper.map(restNews.metadata)
    const news = restNews.items.map(RestNewsMapper.map)
    return {
      paginationInfo: paginationInfo,
      result: news,
    }
  }

  public static getInstance(): NewsRepository {
    if (!NewsRepository.instance) {
      NewsRepository.instance = new NewsRepository()
    }
    return NewsRepository.instance
  }
}

export default NewsRepository
