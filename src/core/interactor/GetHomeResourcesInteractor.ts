import { AuthenticationState } from '../entities/AuthenticationState'
import { News } from '../entities/News'
import { Poll } from '../entities/Poll'
import { Region } from '../entities/Region'
import { Tool } from '../entities/Tool'
import { Profile } from '../entities/Profile'
import allSettled from 'promise.allsettled'
import ProfileRepository from '../../data/ProfileRepository'
import NewsRepository from '../../data/NewsRepository'
import RegionsRepository from '../../data/RegionsRepository'
import ToolsRepository from '../../data/ToolsRepository'
import AuthenticationRepository from '../../data/AuthenticationRepository'
import { GetPollsInteractor } from './GetPollsInteractor'

export interface HomeResources {
  zipCode: string
  region?: Region
  profile?: Profile
  news: Array<News>
  polls: Array<Poll>
  tools: Array<Tool>
  state: AuthenticationState
}

export class GetHomeResourcesInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private regionsRepository = RegionsRepository.getInstance()
  private newsRepository = NewsRepository.getInstance()
  private getPollsInteractor = new GetPollsInteractor()
  private toolsRepository = ToolsRepository.getInstance()

  public async execute(): Promise<HomeResources> {
    const zipCode = await this.profileRepository.getZipCode()
    const state = await this.authenticationRepository.getAuthenticationState()

    const [
      profileResult,
      regionResult,
      newsResult,
      pollsResult,
      toolsResult,
    ] = await allSettled([
      state === AuthenticationState.Authenticated
        ? this.profileRepository.getProfile()
        : undefined,
      this.regionsRepository.getRegion(zipCode),
      this.newsRepository.getLatestNews(),
      this.getPollsInteractor.execute(),
      this.toolsRepository.getTools(),
    ])

    return {
      zipCode: zipCode,
      region:
        regionResult.status === 'fulfilled' ? regionResult.value : undefined,
      profile:
        profileResult?.status === 'fulfilled' ? profileResult.value : undefined,
      news: newsResult.status === 'fulfilled' ? newsResult.value : [],
      polls: pollsResult.status === 'fulfilled' ? pollsResult.value : [],
      tools: toolsResult.status === 'fulfilled' ? toolsResult.value : [],
      state: state,
    }
  }
}
