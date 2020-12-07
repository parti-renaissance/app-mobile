import { TextAnswer } from '../../core/entities/Answer'
import { Question } from '../../core/entities/Poll'
import { PollDetailQuestionInputViewModel } from './PollDetailQuestionInputViewModel'

export const PollDetailQuestionInputViewModelMapper = {
  map: (
    question: Question,
    answer: TextAnswer,
  ): PollDetailQuestionInputViewModel => {
    return {
      id: question.id.toString(),
      title: question.content,
      content: answer.value,
    }
  },
}
