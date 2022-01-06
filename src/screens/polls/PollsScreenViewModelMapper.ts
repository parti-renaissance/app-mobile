import { Poll } from '../../core/entities/Poll'
import { PollRowViewModelMapper } from './PollRowViewModelMapper'
import { PollsHeaderViewModelMapper } from './PollsHeaderViewModelMapper'
import { PollsScreenViewModel } from './PollsScreenViewModel'

export const PollsScreenViewModelMapper = {
  map: (polls: Array<Poll>): PollsScreenViewModel => {
    return {
      header: PollsHeaderViewModelMapper.map(polls),
      rows: polls.map((poll) => PollRowViewModelMapper.map(poll)),
    }
  },
}
