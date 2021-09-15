import { PhoningSessionCallStatus } from '../../core/entities/PhoningSessionConfiguration'
import { PhonePollDetailCallStatusViewModel } from './PhonePollDetailCallStatusViewModel'

export const PhonePollDetailCallStatusViewModelMapper = {
  map: (
    statuses: Array<PhoningSessionCallStatus>,
    selectedStatusCode: string | undefined,
  ): PhonePollDetailCallStatusViewModel => {
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
