import { Poll } from '../core/entities/Poll'
import { PollResult } from '../core/entities/PollResult'
import ApiService from './network/ApiService'
import { RestPollResultRequestMapper } from './mapper/RestPollResultRequestMapper'

class PollsRepository {
  private static instance: PollsRepository
  private apiService = ApiService.getInstance()
  private cachedPolls: Array<Poll> = []
  private constructor() {}

  public async getPolls(zipCode?: string): Promise<Array<Poll>> {
    this.cachedPolls = []
    const polls = await this.apiService.getPolls(zipCode)
    this.cachedPolls = polls
    return polls
  }

  public async getPoll(pollId: number): Promise<Poll> {
    const cachedPoll = this.cachedPolls.find((item) => item.id === pollId)
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

  public async sendPollAnswers(poll: Poll, result: PollResult): Promise<void> {
    const restResponse = RestPollResultRequestMapper.map(poll, result)
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
