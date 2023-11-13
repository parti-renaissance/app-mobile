import { DoorToDoorPollConfigDoorStatus } from "../../../../core/entities/DoorToDoorPollConfig";
import { TunnelDoorOpeningChoiceCardViewModel } from "./TunnelDoorOpeningChoiceCardViewModel";

export const TunnelDoorOpeningChoiceCardViewModelMapper = {
  map: (status: DoorToDoorPollConfigDoorStatus): TunnelDoorOpeningChoiceCardViewModel => {
    return {
      id: status.code,
      title: status.label,
    };
  },
};
