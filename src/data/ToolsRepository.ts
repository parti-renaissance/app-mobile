import { PaginatedResult } from '../core/entities/PaginatedResult'
import { Tool } from '../core/entities/Tool'
import { RestMetadataMapper } from './mapper/RestMetadataMapper'
import { RestToolMapper } from './mapper/RestToolMapper'
import ApiService from './network/ApiService'

class ToolsRepository {
  private static instance: ToolsRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getTools(
    page: number = 1,
  ): Promise<PaginatedResult<Array<Tool>>> {
    const restTools = await this.apiService.getTools(page)
    const paginationInfo = RestMetadataMapper.map(restTools.metadata)
    const tools = restTools.items.map(RestToolMapper.map)
    return {
      paginationInfo: paginationInfo,
      result: tools,
    }
  }

  public static getInstance(): ToolsRepository {
    if (!ToolsRepository.instance) {
      ToolsRepository.instance = new ToolsRepository()
    }
    return ToolsRepository.instance
  }
}

export default ToolsRepository
