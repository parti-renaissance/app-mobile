import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorCampaign } from '../entities/DoorToDoorCampaign'
import { DoorToDoorCampaignRanking } from '../entities/DoorToDoorCampaignRanking'

export class GetDoorToDoorCampaignPopupInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(campaignId: string): Promise<DoorToDoorCampaignPopup> {
    const campaign = await this.repository.getCampaign(campaignId)
    const ranking = await this.repository.getDoorToDoorCampaignRanking(
      campaignId,
    )
    return {
      campaign: campaign,
      ranking: ranking,
    }
  }
}

export interface DoorToDoorCampaignPopup {
  campaign: DoorToDoorCampaign
  ranking: DoorToDoorCampaignRanking
}
