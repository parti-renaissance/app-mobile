import { DoorToDoorPollConfigResponseStatus } from '../../../../core/entities/DoorToDoorPollConfig'
import { TunnelDoorInterlocutorChoiceCardViewModel } from './TunnelDoorInterlocutorChoiceCardViewModel'

export const TunnelDoorInterlocutorChoiceCardViewModelMapper = {
  map: (
    status: DoorToDoorPollConfigResponseStatus,
  ): TunnelDoorInterlocutorChoiceCardViewModel => {
    return {
      id: status.code,
      title: status.label,
    }
  },
}
