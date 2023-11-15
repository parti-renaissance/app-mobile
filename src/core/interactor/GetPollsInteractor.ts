import { DataSource } from '../../data/DataSource'
import PollsRepository from '../../data/PollsRepository'
import { Poll } from '../entities/Poll'

export class GetPollsInteractor {
  private pollsRepository = PollsRepository.getInstance()

  public async execute(
    dataSource: DataSource = 'remote',
  ): Promise<Array<Poll>> {
    return this.pollsRepository.getPolls(dataSource)
  }
}
