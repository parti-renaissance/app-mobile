import ProfileRepository from '../../data/ProfileRepository'
import { TimelineFeedRepository } from '../../data/TimelineFeedRepository'
import PaginatedResult from '../entities/PaginatedResult'
import { TimelineFeedItem } from '../entities/TimelineFeedItem'

export class GetTimelineFeedInteractor {
  private timelineFeedRepository = TimelineFeedRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async execute(
    page: number,
  ): Promise<PaginatedResult<Array<TimelineFeedItem>>> {
    const zipCode = await this.profileRepository.getZipCode()
    const response = await this.timelineFeedRepository.getTimelineFeed(
      page,
      zipCode,
    )
    return response
  }
}
