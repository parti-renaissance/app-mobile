import { QuickPoll, QuickPollResult } from '../../core/entities/QuickPoll'
import {
  RestQuickPollItem,
  RestQuickPollItemResult,
} from '../restObjects/RestQuickPollResponse'

const QuickPollResultMapper = {
  map: (restResult: RestQuickPollItemResult): QuickPollResult => {
    return {
      totalVotesCount: restResult.total,
      answers: restResult.choices.map((restChoice) => {
        return {
          id: restChoice.choice.uuid,
          value: restChoice.choice.value,
          votesCount: restChoice.count,
          votesPercentage: restChoice.percentage,
        }
      }),
    }
  },
}

export const QuickPollMapper = {
  map: (restQuickPollItem: RestQuickPollItem): QuickPoll => {
    return {
      id: restQuickPollItem.uuid,
      question: restQuickPollItem.question,
      result: QuickPollResultMapper.map(restQuickPollItem.result),
    }
  },
}
