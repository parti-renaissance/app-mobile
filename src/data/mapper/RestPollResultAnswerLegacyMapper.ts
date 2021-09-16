import {
  Answer,
  isMultipleChoicesAnswer,
  isSingleChoiceAnswer,
  isTextAnswer,
  MultipleChoicesAnswer,
  SingleChoiceAnswer,
  TextAnswer,
} from '../../core/entities/Answer'
import { RestPollResultAnswerLegacy } from '../restObjects/RestPollResultAnswer'

export const RestPollResultAnswerLegacyMapper = {
  map: (answer: Answer): RestPollResultAnswerLegacy => {
    if (isSingleChoiceAnswer(answer.answer)) {
      const singleChoiceAnswer = answer.answer as SingleChoiceAnswer
      return {
        surveyQuestion: answer.questionId,
        selectedChoices: [singleChoiceAnswer.choiceId.toString()],
      }
    }
    if (isMultipleChoicesAnswer(answer.answer)) {
      const multipleChoicesAnswer = answer.answer as MultipleChoicesAnswer
      return {
        surveyQuestion: answer.questionId,
        selectedChoices: multipleChoicesAnswer.choiceIds.map((id) =>
          id.toString(),
        ),
      }
    }
    if (isTextAnswer(answer.answer)) {
      const textAnswer = answer.answer as TextAnswer
      return {
        surveyQuestion: answer.questionId,
        textField: textAnswer.value,
      }
    }
    throw Error('Impossible path')
  },
}
