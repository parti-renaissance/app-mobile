import { Retaliation } from './../entities/Retaliation'
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
import { DataSource } from '../../data/DataSource'
import { GetQuickPollInteractor } from './GetQuickPollInteractor'
import { StatefulQuickPoll } from '../entities/StatefulQuickPoll'
import { GetNextEventInteractor } from './GetNextEventInteractor'
import { ShortEvent } from '../entities/Event'
import RetaliationRepository from '../../data/RetaliationRepository'

export interface HomeResources {
  zipCode: string
  region?: Region
  profile?: Profile
  news: Array<News>
  polls: Array<Poll>
  tools: Array<Tool>
  quickPoll?: StatefulQuickPoll
  nextEvent?: ShortEvent
  retaliations: Array<Retaliation>
}

export class GetHomeResourcesInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private regionsRepository = RegionsRepository.getInstance()
  private newsRepository = NewsRepository.getInstance()
  private retaliationRepository = RetaliationRepository.getInstance()
  private getPollsInteractor = new GetPollsInteractor()
  private toolsRepository = ToolsRepository.getInstance()
  private pushRepository = PushRepository.getInstance()
  private getQuickPollInteractor = new GetQuickPollInteractor()
  private getNextEventInteractor = new GetNextEventInteractor()

  public async execute(dataSource: DataSource): Promise<HomeResources> {
    const zipCode = await this.profileRepository.getZipCode()
    const state = await this.authenticationRepository.getAuthenticationState()

    const [
      retaliationsResult,
      profileResult,
      departmentResult,
      newsResult,
      pollsResult,
      toolsResult,
      quickPollsResult,
      nextEventResult,
    ] = await allSettled([
      this.retaliationRepository.getRetaliations(),
      state === AuthenticationState.Authenticated
        ? this.profileRepository.getProfile(dataSource)
        : undefined,
      this.regionsRepository.getDepartment(zipCode, dataSource),
      this.newsRepository.getLatestNews(zipCode, dataSource),
      this.getPollsInteractor.execute(dataSource),
      this.toolsRepository.getTools(),
      this.getQuickPollInteractor.execute(zipCode, dataSource),
      this.getNextEventInteractor.execute(),
    ])

    const department =
      departmentResult.status === 'fulfilled'
        ? departmentResult.value
        : await this.getDefault(
            dataSource,
            (departmentDataSource) =>
              this.regionsRepository.getDepartment(
                zipCode,
                departmentDataSource,
              ),
            undefined,
          )

    if (department !== undefined) {
      try {
        await this.pushRepository.synchronizeDepartmentSubscription(department)
        await this.pushRepository.synchronizeRegionSubscription(
          department.region,
        )
        await this.pushRepository.synchronizeBoroughSubscription(zipCode)
      } catch (error) {
        console.log(error)
        // no-op
      }
    }
    await this.pushRepository
      .synchronizePushTokenAssociation()
      .catch((error) => {
        console.log(error)
      })

    return {
      zipCode: zipCode,
      region: department?.region,
      profile:
        profileResult?.status === 'fulfilled'
          ? profileResult.value
          : await this.getDefault(
              dataSource,
              (profileDataSource) =>
                this.profileRepository.getProfile(profileDataSource),
              undefined,
            ),
      news:
        newsResult.status === 'fulfilled'
          ? newsResult.value
          : await this.getDefault(
              dataSource,
              (newsDataSource) =>
                this.newsRepository.getLatestNews(zipCode, newsDataSource),
              [],
            ),
      polls:
        pollsResult.status === 'fulfilled'
          ? pollsResult.value
          : await this.getDefault(
              dataSource,
              (pollsDataSource) =>
                this.getPollsInteractor.execute(pollsDataSource),
              [],
            ),
      tools: toolsResult.status === 'fulfilled' ? toolsResult.value : [],
      quickPoll:
        quickPollsResult.status === 'fulfilled'
          ? quickPollsResult.value
          : await this.getDefault(
              dataSource,
              (quickPollsDatasource) =>
                this.getQuickPollInteractor.execute(
                  zipCode,
                  quickPollsDatasource,
                ),
              undefined,
            ),
      nextEvent:
        nextEventResult.status === 'fulfilled'
          ? nextEventResult.value
          : undefined,
      retaliations:
        retaliationsResult.status === 'fulfilled'
          ? retaliationsResult.value
          : [],
    }
  }

  private async getDefault<T>(
    dataSource: DataSource,
    fetch: (dataSource: DataSource) => Promise<T>,
    defaultValue: T,
  ): Promise<T> {
    switch (dataSource) {
      case 'cache':
        return defaultValue
      case 'remote':
        return fetch('cache').catch(() => defaultValue)
    }
  }
}
