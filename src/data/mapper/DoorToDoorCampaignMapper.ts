import { DoorToDoorCampaign } from "../../core/entities/DoorToDoorCampaign";
import { RestDoorToDoorCampaign } from "../restObjects/RestDoorToDoorCampaign";

export const DoorToDoorCampaignMapper = {
  map: (restObject: RestDoorToDoorCampaign): DoorToDoorCampaign => {
    return {
      uuid: restObject.uuid,
      title: restObject.title,
      brief: restObject.brief ?? "",
      goal: restObject.goal ?? 0,
      finishAt: new Date(restObject.finish_at),
    };
  },
};
