import { Retaliation } from '../core/entities/Retaliation'
import { RestRetaliationMapper } from './mapper/RestRetaliationMapper'
import ApiService from './network/ApiService'

class RetaliationRepository {
  private static instance: RetaliationRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getRetaliations(): Promise<Array<Retaliation>> {
    const restRetaliations = await this.apiService.getRetaliations()
    const retaliations = restRetaliations.map(RestRetaliationMapper.map)
    return retaliations
  }

  public async getRetaliation(id: string): Promise<Retaliation> {
    const restRetaliation = await this.apiService.getRetaliation(id)
    return RestRetaliationMapper.map(restRetaliation)
  }

  public static getInstance(): RetaliationRepository {
    if (!RetaliationRepository.instance) {
      RetaliationRepository.instance = new RetaliationRepository()
    }
    return RetaliationRepository.instance
  }
}

export default RetaliationRepository
