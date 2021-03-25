import { DataSource } from '../../data/DataSource'
import QuickPollRepository from '../../data/QuickPollRepository'
import { StatefulQuickPoll } from '../entities/StatefulQuickPoll'

export class GetQuickPollInteractor {
  private quickPollRepository = QuickPollRepository.getInstance()

  public async execute(
    dataSource: DataSource = 'remote',
  ): Promise<StatefulQuickPoll | undefined> {
    const polls = await this.quickPollRepository.getQuickPolls(dataSource)
    if (polls.length === 0) {
      return undefined
    }
    const poll = polls[0]
    const answeredPollsIds = await this.quickPollRepository.getAnsweredQuickPolls()
    return {
      ...poll,
      state: answeredPollsIds.includes(poll.id) ? 'answered' : 'pending',
    }
  }
}
