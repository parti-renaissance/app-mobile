import { PhoningCampaign } from '../core/entities/PhoningCampaign'
import { PhoningSession } from '../core/entities/PhoningSession'
import { PhoningSessionConfiguration } from '../core/entities/PhoningSessionConfiguration'
import { Poll } from '../core/entities/Poll'
import { PhoningCampaignMapper } from './mapper/PhoningCampaignMapper'
import { PhoningSessionConfigurationMapper } from './mapper/PhoningSessionConfigurationMapper'
import { PhoningSessionMapper } from './mapper/PhoningSessionMapper'
import ApiService from './network/ApiService'

class PhoningCampaignRepository {
  private static instance: PhoningCampaignRepository
  private apiService = ApiService.getInstance()
  public static getInstance(): PhoningCampaignRepository {
    if (!PhoningCampaignRepository.instance) {
      PhoningCampaignRepository.instance = new PhoningCampaignRepository()
    }
    return PhoningCampaignRepository.instance
  }

  public async getPhoningCampaigns(): Promise<Array<PhoningCampaign>> {
    const restCampaigns = await this.apiService.getPhoningCampaigns()
    return restCampaigns.map(PhoningCampaignMapper.map)
  }

  public async getPhoningCampaignPoll(campaignId: string): Promise<Poll> {
    const poll = await this.apiService.getPhoningCampaignPoll(campaignId)
    return poll
  }

  public async getPhoningCampaignSession(
    campaignId: string,
  ): Promise<PhoningSession> {
    const restSession = await this.apiService.getPhoningCampaignSession(
      campaignId,
    )
    return PhoningSessionMapper.map(restSession)
  }

  public async getPhoningSessionConfiguration(
    sessionId: string,
  ): Promise<PhoningSessionConfiguration> {
    const restConfiguration = await this.apiService.getPhoningSessionConfiguration(
      sessionId,
    )
    return PhoningSessionConfigurationMapper.map(restConfiguration)
  }

  public async updatePhoningSessionStatus(
    sessionId: string,
    status: string,
  ): Promise<void> {
    await this.apiService.updatePhoningSessionStatus(sessionId, status)
  }
}

export default PhoningCampaignRepository
