import { News } from '../core/entities/News'
import { PaginatedResult } from '../core/entities/PaginatedResult'
import { DataSource } from './DataSource'
import { RestMetadataMapper } from './mapper/RestMetadataMapper'
import { RestNewsMapper } from './mapper/RestNewsMapper'
import ApiService from './network/ApiService'
import { RestNewsResponse } from './restObjects/RestNewsResponse'
import CacheManager from './store/CacheManager'

const firstPage = 1

class NewsRepository {
  private static instance: NewsRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getLatestNews(
    zipCode: string,
    dataSource: DataSource = 'remote',
  ): Promise<Array<News>> {
    const cacheKey = 'latest_news_' + zipCode
    let restNews: RestNewsResponse
    switch (dataSource) {
      case 'cache':
        restNews = await this.cacheManager.getFromCache(cacheKey)
        break
      case 'remote':
        restNews = await this.apiService.getNews(zipCode, firstPage)
        await this.cacheManager.setInCache(cacheKey, restNews)
        break
    }
    return restNews.items.map(RestNewsMapper.map)
  }

  public async getNews(
    zipCode: string,
    page: number,
  ): Promise<PaginatedResult<Array<News>>> {
    const restNews = await this.apiService.getNews(zipCode, page)
    const paginationInfo = RestMetadataMapper.map(restNews.metadata)
    const news = restNews.items.map(RestNewsMapper.map)
    return {
      paginationInfo: paginationInfo,
      result: news,
    }
  }

  public async getNewsDetail(id: string): Promise<News> {
    const restNews = await this.apiService.getNewsDetail(id)
    return RestNewsMapper.map(restNews)
  }

  public static getInstance(): NewsRepository {
    if (!NewsRepository.instance) {
      NewsRepository.instance = new NewsRepository()
    }
    return NewsRepository.instance
  }
}

export default NewsRepository
