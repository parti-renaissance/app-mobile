import { HomeRepository } from '../../data/HomeRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { PaginatedResult } from '../entities/PaginatedResult'
import { TimelineFeedItem } from '../entities/TimelineFeedItem'

export class GetTimelineFeedInteractor {
  private timelineFeedRepository = HomeRepository.getInstance()
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
