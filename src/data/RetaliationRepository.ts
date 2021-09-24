import { RestRetaliationMapper } from './mapper/RestRetaliationMapper'
import ApiService from './network/ApiService'
import { Retaliation } from '../core/entities/Retaliation'

class RetaliationRepository {
  private static instance: RetaliationRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getRetaliations(): Promise<Array<Retaliation>> {
    let restRetaliations = await this.apiService.getRetaliations()
    const retaliations = restRetaliations.map(RestRetaliationMapper.map)
    return retaliations
  }

  public static getInstance(): RetaliationRepository {
    if (!RetaliationRepository.instance) {
      RetaliationRepository.instance = new RetaliationRepository()
    }
    return RetaliationRepository.instance
  }
}

export default RetaliationRepository
