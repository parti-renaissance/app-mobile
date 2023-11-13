import {
  Answer,
  isMultipleChoicesAnswer,
  isSingleChoiceAnswer,
  isTextAnswer,
  MultipleChoicesAnswer,
  SingleChoiceAnswer,
  TextAnswer,
} from "../../core/entities/Answer";
import { RestPollResultAnswer } from "../restObjects/RestPollResultAnswer";

export const RestPollResultAnswerMapper = {
  map: (answer: Answer): RestPollResultAnswer => {
    if (isSingleChoiceAnswer(answer.answer)) {
      const singleChoiceAnswer = answer.answer as SingleChoiceAnswer;
      return {
        surveyQuestion: answer.questionId,
        selectedChoices: [singleChoiceAnswer.choiceId],
      };
    }
    if (isMultipleChoicesAnswer(answer.answer)) {
      const multipleChoicesAnswer = answer.answer as MultipleChoicesAnswer;
      return {
        surveyQuestion: answer.questionId,
        selectedChoices: multipleChoicesAnswer.choiceIds,
      };
    }
    if (isTextAnswer(answer.answer)) {
      const textAnswer = answer.answer as TextAnswer;
      return {
        surveyQuestion: answer.questionId,
        textField: textAnswer.value,
      };
    }
    throw Error("Impossible path");
  },
};
