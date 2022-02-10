import { News } from '../core/entities/News'
import ApiService from './network/ApiService'
import { RestNewsMapper } from './mapper/RestNewsMapper'
import PaginatedResult from '../core/entities/PaginatedResult'
import { RestMetadataMapper } from './mapper/RestMetadataMapper'
import CacheManager from './store/CacheManager'
import { DataSource } from './DataSource'
import { RestNewsResponse } from './restObjects/RestNewsResponse'
import { NotFoundError } from '../core/errors'

const firstPage = 1

class NewsRepository {
  private static instance: NewsRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private cachedNews: Array<News> = []
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
    if (page <= 1) {
      this.cachedNews = []
    }
    this.cachedNews.push(...news)
    return {
      paginationInfo: paginationInfo,
      result: news,
    }
  }

  public async getNewsDetail(id: string): Promise<News> {
    // TODO: (Pierre Felgines) 2022/02/10 Update this method once webservice available
    const foundNews = this.cachedNews.find((news) => news.id === id)
    if (foundNews !== undefined) {
      return foundNews
    } else {
      throw new NotFoundError()
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
