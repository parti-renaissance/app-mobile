import { QuickPoll } from '../core/entities/QuickPoll'
import { NotFoundError } from '../core/errors'
import { DataSource } from './DataSource'
import { QuickPollMapper } from './mapper/QuickPollMapper'
import ApiService from './network/ApiService'
import { RestQuickPollItem } from './restObjects/RestQuickPollResponse'
import CacheManager from './store/CacheManager'
import LocalStore from './store/LocalStore'

class QuickPollRepository {
  private static instance: QuickPollRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private localStore = LocalStore.getInstance()
  private constructor() {}

  public async getQuickPoll(
    zipCode: string,
    dataSource: DataSource = 'remote',
  ): Promise<QuickPoll> {
    const cacheKey = 'quick_polls_' + zipCode
    let restResponse: RestQuickPollItem
    switch (dataSource) {
      case 'cache':
        restResponse = await this.cacheManager.getFromCache(cacheKey)
        break
      case 'remote':
        try {
          restResponse = await this.apiService.getQuickPolls(zipCode)
        } catch (error) {
          if (error instanceof NotFoundError) {
            await this.cacheManager.removeFromCache(cacheKey)
          }
          throw error
        }
        await this.cacheManager.setInCache(cacheKey, restResponse)
        break
    }
    return QuickPollMapper.map(restResponse)
  }

  public async sendQuickPollAnswer(answerId: string): Promise<QuickPoll> {
    let restPoll = await this.apiService.sendQuickPollAnswer(answerId)
    return QuickPollMapper.map(restPoll)
  }

  public saveAnsweredQuickPoll(quickPollId: string): Promise<void> {
    return this.localStore.storeAnsweredQuickPoll(quickPollId)
  }

  public getAnsweredQuickPolls(): Promise<Array<string>> {
    return this.localStore.getAnsweredQuickPolls()
  }

  public static getInstance(): QuickPollRepository {
    if (!QuickPollRepository.instance) {
      QuickPollRepository.instance = new QuickPollRepository()
    }
    return QuickPollRepository.instance
  }
}

export default QuickPollRepository
