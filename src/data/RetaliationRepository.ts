import { RestRetaliationMapper } from './mapper/RestRetaliationMapper'
import { RestRetaliationsResponse } from './restObjects/RestRetaliationsResponse'
import ApiService from './network/ApiService'
import { Retaliation } from '../core/entities/Retaliation'

class RetaliationRepository {
  private static instance: RetaliationRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getRetaliations(): Promise<Array<Retaliation>> {
    let restRetaliations: RestRetaliationsResponse
    restRetaliations = await this.apiService.getRetaliations()
    return restRetaliations.items.map(RestRetaliationMapper.map)
  }

  public static getInstance(): RetaliationRepository {
    if (!RetaliationRepository.instance) {
      RetaliationRepository.instance = new RetaliationRepository()
    }
    return RetaliationRepository.instance
  }
}

export default RetaliationRepository
