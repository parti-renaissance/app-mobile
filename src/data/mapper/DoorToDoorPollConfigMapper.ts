import { DoorToDoorPollConfig } from "../../core/entities/DoorToDoorPollConfig";
import { RestDoorToDoorPollConfig } from "../restObjects/RestDoorToDoorPollConfig";
import { PollConfigQuestionPageMapper } from "./PollConfigQuestionMapper";

export const DoorToDoorPollConfigMapper = {
  map: (restObject: RestDoorToDoorPollConfig): DoorToDoorPollConfig => {
    return {
      before: {
        doorStatus: restObject.before_survey.door_status
          .flat() // TODO remove flat when server removed nested arrays
          .map((item) => {
            return {
              code: item.code,
              label: item.label,
              success: item.success_status,
            };
          }),
        responseStatus: restObject.before_survey.response_status
          .flat() // TODO remove flat when server removed nested arrays
          .map((item) => {
            return {
              code: item.code,
              label: item.label,
            };
          }),
      },
      after: restObject.after_survey.map((page) => PollConfigQuestionPageMapper.map(page)),
    };
  },
};
