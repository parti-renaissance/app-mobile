import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhoningSessionConfiguration } from '../entities/PhoningSessionConfiguration'
import { Poll } from '../entities/Poll'

export interface PhonePollDetailResources {
  poll: Poll
  configuration: PhoningSessionConfiguration
}

export class GetPhonePollDetailResourcesInteractor {
  private phoningCampaignRepository = PhoningCampaignRepository.getInstance()

  public async execute(
    campaignId: string,
    sessionId: string,
  ): Promise<PhonePollDetailResources> {
    const poll =
      await this.phoningCampaignRepository.getPhoningCampaignPoll(campaignId)
    const configuration =
      await this.phoningCampaignRepository.getPhoningSessionConfiguration(
        sessionId,
      )
    return {
      poll,
      configuration,
    }
  }
}
