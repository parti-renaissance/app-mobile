import { Poll } from '../core/entities/Poll'
import { PollResult } from '../core/entities/PollResult'
import ApiService from './network/ApiService'
import { RestPollResultRequestMapper } from './mapper/RestPollResultRequestMapper'
import { DataSource } from './DataSource'
import CacheManager from './store/CacheManager'
import { Location } from 'react-native-location'

class PollsRepository {
  private static instance: PollsRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private memoryCachedPolls: Array<Poll> = []
  private constructor() {}

  public async getPolls(
    dataSource: DataSource = 'remote',
  ): Promise<Array<Poll>> {
    const cacheKey = 'polls'
    switch (dataSource) {
      case 'cache':
        const cachedPolls = await this.cacheManager.getFromCache(cacheKey)
        this.memoryCachedPolls = cachedPolls
        return cachedPolls
      case 'remote':
        const polls = await this.apiService.getPolls()
        await this.cacheManager.setInCache(cacheKey, polls)
        this.memoryCachedPolls = polls
        return polls
    }
  }

  public async getPoll(pollId: number): Promise<Poll> {
    const cachedPoll = this.memoryCachedPolls.find((item) => item.id === pollId)
    if (cachedPoll) {
      return cachedPoll
    }

    // If no cache, fetch again to find matching poll
    const polls = await this.getPolls()
    const poll = polls.find((item_1) => item_1.id === pollId)
    if (poll) {
      return poll
    } else {
      throw new Error(`Poll with id ${pollId} does not exists`)
    }
  }

  public async sendPollAnswers(
    poll: Poll,
    result: PollResult,
    location: Location | null,
  ): Promise<void> {
    const restResponse = RestPollResultRequestMapper.map(poll, result, location)
    await this.apiService.sendPollAnswers(restResponse)
  }

  public static getInstance(): PollsRepository {
    if (!PollsRepository.instance) {
      PollsRepository.instance = new PollsRepository()
    }
    return PollsRepository.instance
  }
}

export default PollsRepository
