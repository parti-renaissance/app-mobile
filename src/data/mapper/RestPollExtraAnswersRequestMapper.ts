import {
  isPollExtraCompoundAnswer,
  isPollExtraMultipleChoicesAnswer,
  isPollExtraSingleChoiceAnswer,
  isPollExtraTextAnswer,
  PollExtraAnswer,
  PollExtraCompoundAnswer,
  PollExtraMultipleChoicesAnswer,
  PollExtraSingleChoiceAnswer,
  PollExtraTextAnswer,
} from '../../core/entities/PollExtraAnswer'
import {
  NO_ID,
  YES_ID,
} from '../../screens/pollDetailUserData/PollDetailQuestionUserDataViewModelMapper'

export const RestPollExtraAnswersRequestMapper = {
  map: (answers: ReadonlyArray<PollExtraAnswer>): any => {
    return answers.reduce((result: any, obj: PollExtraAnswer): any => {
      if (isPollExtraTextAnswer(obj.answer)) {
        result[obj.questionId] = (obj.answer as PollExtraTextAnswer).value
      } else if (isPollExtraSingleChoiceAnswer(obj.answer)) {
        const singleChoiceAnswer = obj.answer as PollExtraSingleChoiceAnswer
        if (singleChoiceAnswer.choiceId === YES_ID) {
          result[obj.questionId] = true
        } else if (singleChoiceAnswer.choiceId === NO_ID) {
          result[obj.questionId] = false
        } else {
          result[obj.questionId] = singleChoiceAnswer.choiceId
        }
      } else if (isPollExtraMultipleChoicesAnswer(obj.answer)) {
        result[obj.questionId] = (
          obj.answer as PollExtraMultipleChoicesAnswer
        ).choiceIds.join()
      } else if (isPollExtraCompoundAnswer(obj.answer)) {
        const compoundValues = (obj.answer as PollExtraCompoundAnswer).values
        compoundValues.forEach((value, key) => {
          // eslint-disable-next-line security/detect-object-injection
          result[key] = value
        })
      }
      return result
    }, {})
  },
}
