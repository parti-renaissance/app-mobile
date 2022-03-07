import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorPollResult } from '../../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'
import { DoorToDoorPollParams } from '../entities/DoorToDoorPollParams'
import {
  SendDoorToDoorPollAnswersJobQueue,
  SendDoorToDoorPollAnswersJobQueueItem,
} from '../../data/store/SendDoorToDoorPollAnswersJobQueue'
import { ServerTimeoutError } from '../errors'

export const INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE = 'accept_to_answer'

export class SendDoorPollAnswersInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(
    params: SendDoorToDoorPollAnswersJobQueueItem,
  ): Promise<void> {
    const pollParams = {
      campaignId: params.campaignId,
      buildingId: params.buildingParams.id,
      status: params.doorStatus,
      block: params.buildingParams.block,
      floor: params.buildingParams.floor,
      door: params.buildingParams.door,
    }
    try {
      await this.sendAnswers(
        params.doorStatus,
        pollParams,
        params.pollResult ?? { answers: [], qualificationAnswers: [] },
      )
    } catch (error) {
      if (error instanceof ServerTimeoutError) {
        this.enqueueAnswers(params)
        return
      }
      throw error
    }

    if (params.buildingParams.type === 'house') {
      await DoorToDoorRepository.getInstance().closeBuildingBlockFloor(
        params.campaignId,
        params.buildingParams.id,
        params.buildingParams.block,
        params.buildingParams.floor,
      )
    }
  }

  private async sendAnswers(
    status: string,
    pollParams: DoorToDoorPollParams,
    pollResult: DoorToDoorPollResult,
  ) {
    const response = await this.repository.createDoorPollCampaignHistory(
      pollParams,
      pollResult,
    )
    if (status === INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE && pollResult) {
      await this.repository.sendDoorToDoorPollAnswers(response.uuid, pollResult)
    }
  }

  private async enqueueAnswers(params: SendDoorToDoorPollAnswersJobQueueItem) {
    const queue = await SendDoorToDoorPollAnswersJobQueue.getInstance()
    await queue.enqueue(params)
  }
}
