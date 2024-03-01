import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorCampaign } from '../entities/DoorToDoorCampaign'
import { DoorToDoorCampaignRanking } from '../entities/DoorToDoorCampaignRanking'

export class GetDoorToDoorCampaignInfoInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(campaignId: string): Promise<DoorToDoorCampaignInfo> {
    const campaign = await this.repository.getCampaign(campaignId)
    const ranking =
      await this.repository.getDoorToDoorCampaignRanking(campaignId)
    return {
      campaign: campaign,
      ranking: ranking,
    }
  }
}

export interface DoorToDoorCampaignInfo {
  campaign: DoorToDoorCampaign
  ranking: DoorToDoorCampaignRanking
}
