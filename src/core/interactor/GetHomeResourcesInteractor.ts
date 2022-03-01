import { Region } from '../entities/Region'
import { Profile } from '../entities/Profile'
import allSettled from 'promise.allsettled'
import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import PushRepository from '../../data/PushRepository'
import { DataSource } from '../../data/DataSource'
import { GetQuickPollInteractor } from './GetQuickPollInteractor'
import { StatefulQuickPoll } from '../entities/StatefulQuickPoll'
import { GetNextEventInteractor } from './GetNextEventInteractor'
import { ShortEvent } from '../entities/Event'
import { HomeRepository } from '../../data/HomeRepository'
import { HeaderInfos } from '../entities/HeaderInfos'

export interface HomeResources {
  headerInfos?: HeaderInfos
  zipCode: string
  region?: Region
  profile?: Profile
  quickPoll?: StatefulQuickPoll
  nextEvent?: ShortEvent
}

export class GetHomeResourcesInteractor {
  private homeRepository = HomeRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private regionsRepository = RegionsRepository.getInstance()
  private pushRepository = PushRepository.getInstance()
  private getQuickPollInteractor = new GetQuickPollInteractor()
  private getNextEventInteractor = new GetNextEventInteractor()

  public async execute(dataSource: DataSource): Promise<HomeResources> {
    const zipCode = await this.profileRepository.getZipCode()

    const [
      headerInfosResult,
      profileResult,
      departmentResult,
      quickPollsResult,
      nextEventResult,
    ] = await allSettled([
      this.homeRepository.getHomeHeader(dataSource),
      this.profileRepository.getProfile(dataSource),
      this.regionsRepository.getDepartment(zipCode, dataSource),
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
      headerInfos:
        headerInfosResult?.status === 'fulfilled'
          ? headerInfosResult.value
          : await this.getDefault(
              dataSource,
              (headerInfosDataSource) =>
                this.homeRepository.getHomeHeader(headerInfosDataSource),
              undefined,
            ),
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
