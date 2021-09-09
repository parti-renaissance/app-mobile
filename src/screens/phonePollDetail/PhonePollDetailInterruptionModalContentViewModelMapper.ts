import { PhoningSessionCallStatus } from '../../core/entities/PhoningSessionConfiguration'
import { PhonePollDetailInterruptionModalContentViewModel } from './PhonePollDetailInterruptionModalContentViewModel'

export const PhonePollDetailInterruptionModalContentViewModelMapper = {
  map: (
    statuses: Array<PhoningSessionCallStatus>,
    selectedStatusCode: string | undefined,
  ): PhonePollDetailInterruptionModalContentViewModel => {
    return {
      isActionEnabled: selectedStatusCode !== undefined,
      choices: statuses.map((status) => {
        return {
          id: status.code,
          title: status.label,
          isSelected: status.code === selectedStatusCode,
        }
      }),
    }
  },
}
