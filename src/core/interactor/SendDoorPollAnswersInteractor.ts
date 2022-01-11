import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorPollResult } from '../../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'

export const INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE = 'accept_to_answer'

export class SendDoorPollAnswersInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(
    campaignId: string,
    status: string,
    buildingParams: BuildingSelectedParams,
    pollResult?: DoorToDoorPollResult,
  ): Promise<void> {
    const pollParams = {
      campaignId: campaignId,
      buildingId: buildingParams.id,
      status: status,
      block: buildingParams.block,
      floor: buildingParams.floor,
      door: buildingParams.door,
    }
    const response = await this.repository.createDoorPollCampaignHistory(
      pollParams,
      pollResult ?? { answers: [], qualificationAnswers: [] },
    )
    if (status === INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE && pollResult) {
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
