import { DataProtectionRegulation } from '../core/entities/DataProtectionRegulation'
import { DataProtectionRegulationMapper } from './mapper/DataProtectionRegulationMapper'
import ApiService from './network/ApiService'

class LegalRepository {
  private static instance: LegalRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getDataProtectionRegulation(): Promise<DataProtectionRegulation> {
    const restDataProtectionRegulation = await this.apiService.getGdpr()
    return DataProtectionRegulationMapper.map(restDataProtectionRegulation)
  }

  public static getInstance(): LegalRepository {
    if (!LegalRepository.instance) {
      LegalRepository.instance = new LegalRepository()
    }
    return LegalRepository.instance
  }
}

export default LegalRepository
