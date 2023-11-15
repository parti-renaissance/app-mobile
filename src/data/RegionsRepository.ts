import { Department } from '../core/entities/Department'
import { Region } from '../core/entities/Region'
import { DepartmentNotFoundError, NotFoundError } from '../core/errors'
import { DataSource } from './DataSource'
import { DepartmentMapper } from './mapper/DepartmentMapper'
import ApiService from './network/ApiService'
import { RestDepartmentResponse } from './restObjects/RestDepartmentResponse'
import CacheManager from './store/CacheManager'

class RegionsRepository {
  private static instance: RegionsRepository
  private apiService = ApiService.getInstance()
  private cacheManager = CacheManager.getInstance()
  private constructor() {}

  public async getDepartment(
    zipCode: string,
    dataSource: DataSource = 'remote',
  ): Promise<Department> {
    try {
      const restDepartment: RestDepartmentResponse =
        await this.getDepartmentAuthenticated(zipCode, dataSource)
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
        return this.cacheManager.getFromCache(cacheKey)
      case 'remote':
        const department = await this.apiService.getDepartment(zipCode)
        await this.cacheManager.setInCache(cacheKey, department)
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
