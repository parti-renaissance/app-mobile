import { DoorToDoorPollParams } from '../../core/entities/DoorToDoorPollParams'
import { DoorToDoorPollResult } from '../../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'
import { RestDoorToDoorPollResultRequest } from '../restObjects/RestDoorToDoorPollResultRequest'
import { RestPollExtraAnswersRequestMapper } from './RestPollExtraAnswersRequestMapper'
import { RestPollResultAnswerMapper } from './RestPollResultAnswerMapper'

export const RestDoorToDoorPollRequestMapper = {
  mapHistoryRequest: (
    pollParams: DoorToDoorPollParams,
    pollResult: DoorToDoorPollResult,
  ): any => {
    return {
      ...RestPollExtraAnswersRequestMapper.map(pollResult.qualificationAnswers),
      campaign: pollParams.campaignId,
      status: pollParams.status,
      building: pollParams.buildingId,
      building_block: pollParams.block,
      floor: pollParams.floor,
      door: pollParams.door.toString(),
    }
  },
  mapAnswers: (
    pollResult: DoorToDoorPollResult,
  ): RestDoorToDoorPollResultRequest => {
    return {
      survey: '',
      answers: pollResult.answers.map((answer) =>
        RestPollResultAnswerMapper.map(answer),
      ),
    }
  },
}
