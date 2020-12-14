import { Department } from '../core/entities/Department'
import { Region } from '../core/entities/Region'
import { DepartmentNotFoundError, NotFoundError } from '../core/errors'
import ApiService from './network/ApiService'
import { DepartmentMapper } from './mapper/DepartmentMapper'
import OAuthApiService from './network/OAuthApiService'
import { RestDepartmentResponse } from './restObjects/RestDepartmentResponse'
import AuthenticationRepository from './AuthenticationRepository'

class RegionsRepository {
  private static instance: RegionsRepository
  private oauthService = OAuthApiService.getInstance()
  private authenticationRepository = AuthenticationRepository.getInstance()
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getDepartment(
    zipCode: string,
    mode: 'Anonymous' | 'Authenticated' = 'Authenticated',
  ): Promise<Department> {
    try {
      let restDepartment: RestDepartmentResponse
      switch (mode) {
        case 'Anonymous':
          const deviceId = await this.authenticationRepository.getDeviceId()
          const credentials = await this.oauthService.anonymousLogin(deviceId)
          restDepartment = await this.apiService.getDepartment(
            zipCode,
            credentials.access_token,
          )
          break
        case 'Authenticated':
          restDepartment = await this.apiService.getDepartment(zipCode)
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

  public async getRegion(zipCode: string): Promise<Region> {
    return (await this.getDepartment(zipCode)).region
  }

  public static getInstance(): RegionsRepository {
    if (!RegionsRepository.instance) {
      RegionsRepository.instance = new RegionsRepository()
    }
    return RegionsRepository.instance
  }
}

export default RegionsRepository
