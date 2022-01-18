import ApiService from './network/ApiService'
import { Gdpr } from '../core/entities/Gdpr'
import { GdprMapper } from './mapper/GdprMapper'

class LegalRepository {
  private static instance: LegalRepository
  private apiService = ApiService.getInstance()
  private constructor() {}

  public async getGdrp(): Promise<Gdpr> {
    const restGdpr = await this.apiService.getGdpr()
    return GdprMapper.map(restGdpr)
  }

  public static getInstance(): LegalRepository {
    if (!LegalRepository.instance) {
      LegalRepository.instance = new LegalRepository()
    }
    return LegalRepository.instance
  }
}

export default LegalRepository
