import { Poll } from '../../core/entities/Poll'
import Theme from '../../themes/Theme'
import { PollRowViewModelMapper } from './PollRowViewModelMapper'
import { PollsHeaderViewModelMapper } from './PollsHeaderViewModelMapper'
import { PollsScreenViewModel } from './PollsScreenViewModel'

export const PollsScreenViewModelMapper = {
  map: (theme: Theme, polls: Array<Poll>): PollsScreenViewModel => {
    return {
      header: PollsHeaderViewModelMapper.map(polls),
      rows: polls.map((poll) => PollRowViewModelMapper.map(theme, poll)),
    }
  },
}
