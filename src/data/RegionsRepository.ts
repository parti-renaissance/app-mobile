import { Department } from '../core/entities/Department'
import { Region } from '../core/entities/Region'
import {
  DepartmentNotFoundError,
  NotFoundError,
  CacheMissError,
} from '../core/errors'
import ApiService from './network/ApiService'
import { DepartmentMapper } from './mapper/DepartmentMapper'
import OAuthApiService from './network/OAuthApiService'
import { RestDepartmentResponse } from './restObjects/RestDepartmentResponse'
import AuthenticationRepository from './AuthenticationRepository'
import { DataSource } from './DataSource'
import CacheManager from './store/CacheManager'

class RegionsRepository {
  private static instance: RegionsRepository
  private oauthService = OAuthApiService.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getDepartment(
    zipCode: string,
    dataSource: DataSource = 'remote',
    mode: 'Anonymous' | 'Authenticated' = 'Authenticated',
  ): Promise<Department> {
    try {
      let restDepartment: RestDepartmentResponse
      switch (mode) {
        case 'Anonymous':
          if (dataSource !== 'remote') {
            throw new Error(
              'Unauthenticated department fetch must be done from a remote source',
            )
          }
          const deviceId = await this.authenticationRepository.getDeviceId()
          const credentials = await this.oauthService.anonymousLogin(deviceId)
          restDepartment = await this.apiService.getDepartment(
            zipCode,
            credentials.access_token,
          )
          break
        case 'Authenticated':
          restDepartment = await this.getDepartmentAuthenticated(
            zipCode,
            dataSource,
          )
          break
      }
      return DepartmentMapper.map(restDepartment)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new DepartmentNotFoundError()
      }
      throw error
    }
  }

  private async getDepartmentAuthenticated(
    zipCode: string,
    dataSource: DataSource,
  ): Promise<RestDepartmentResponse> {
    const cacheKey = 'department_' + zipCode
    switch (dataSource) {
      case 'cache':
        const result = await this.cacheManager.getFromCache(cacheKey)
        if (result === undefined) {
          throw new CacheMissError()
        }
        return JSON.parse(result)
      case 'remote':
        const department = await this.apiService.getDepartment(zipCode)
        await this.cacheManager.setInCache(cacheKey, JSON.stringify(department))
        return department
    }
  }

  public async getRegion(
    zipCode: string,
    dataSource: DataSource = 'remote',
  ): Promise<Region> {
    return (await this.getDepartment(zipCode, dataSource)).region
  }

  public static getInstance(): RegionsRepository {
    if (!RegionsRepository.instance) {
      RegionsRepository.instance = new RegionsRepository()
    }
    return RegionsRepository.instance
  }
}

export default RegionsRepository
