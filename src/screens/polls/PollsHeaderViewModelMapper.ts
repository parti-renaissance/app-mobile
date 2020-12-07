import { Poll } from '../../core/entities/Poll'
import i18n from '../../utils/i18n'
import { PollsHeaderViewModel } from './PollsHeaderViewModel'

export const PollsHeaderViewModelMapper = {
  map: (polls: Array<Poll>): PollsHeaderViewModel => {
    return {
      subtitle:
        polls.length === 0
          ? i18n.t('polls.subtitle_no_polls')
          : i18n.t('polls.subtitle', { count: polls.length }),
    }
  },
}
