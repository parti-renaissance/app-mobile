import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorPollResult } from '../../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'

export const INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE = 'accept_to_answer'

export class SendDoorPollAnswersInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(
    campaignId: string,
    interlocutorStatus: string,
    buildingParams: BuildingSelectedParams,
    pollResult: DoorToDoorPollResult,
  ): Promise<void> {
    const pollParams = {
      campaignId: campaignId,
      buildingId: buildingParams.id,
      interlocutorStatus: interlocutorStatus,
      block: buildingParams.block,
      floor: buildingParams.floor,
      door: buildingParams.door,
    }
    const response = await this.repository.createDoorPollCampaignHistory(
      pollParams,
      pollResult,
    )
    if (interlocutorStatus === INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE) {
      await this.repository.sendDoorToDoorPollAnswers(response.uuid, pollResult)
    }
  }
}

export interface BuildingSelectedParams {
  id: string
  block: string
  floor: number
  door: number
}
