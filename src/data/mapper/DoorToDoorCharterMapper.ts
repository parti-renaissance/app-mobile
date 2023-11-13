import {
  DoorToDoorCharterAccepted,
  DoorToDoorCharterNotAccepted,
  DoorToDoorCharterState,
} from "../../core/entities/DoorToDoorCharterState";
import {
  RestDoorToDoorCharter,
  RestDoorToDoorCharterAccepted,
} from "../restObjects/RestDoorToDoorCharter";

export const DoorToDoorCharterMapper = {
  map: (restObject: RestDoorToDoorCharter): DoorToDoorCharterState => {
    if (restObject instanceof RestDoorToDoorCharterAccepted) {
      return new DoorToDoorCharterAccepted();
    } else {
      return new DoorToDoorCharterNotAccepted(restObject.content);
    }
  },
};
