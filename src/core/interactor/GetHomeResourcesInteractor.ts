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
import PushRepository from '../../data/PushRepository'

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
  private pushRepository = PushRepository.getInstance()

  public async execute(): Promise<HomeResources> {
    const zipCode = await this.profileRepository.getZipCode()
    const state = await this.authenticationRepository.getAuthenticationState()

    const [
      profileResult,
      departmentResult,
      newsResult,
      pollsResult,
      toolsResult,
    ] = await allSettled([
      state === AuthenticationState.Authenticated
        ? this.profileRepository.getProfile()
        : undefined,
      this.regionsRepository.getDepartment(zipCode),
      this.newsRepository.getLatestNews(),
      this.getPollsInteractor.execute(),
      this.toolsRepository.getTools(),
    ])

    const department =
      departmentResult.status === 'fulfilled'
        ? departmentResult.value
        : undefined

    if (department !== undefined) {
      try {
        await this.pushRepository.subscribeToDepartment(department)
        await this.pushRepository.subscribeToRegion(department.region)
      } catch (error) {
        console.log(error)
        // no-op
      }
    }

    return {
      zipCode: zipCode,
      region: department?.region,
      profile:
        profileResult?.status === 'fulfilled' ? profileResult.value : undefined,
      news: newsResult.status === 'fulfilled' ? newsResult.value : [],
      polls: pollsResult.status === 'fulfilled' ? pollsResult.value : [],
      tools: toolsResult.status === 'fulfilled' ? toolsResult.value : [],
      state: state,
    }
  }
}
