import { SingleChoiceAnswer } from "../../core/entities/Answer";
import { Question } from "../../core/entities/Poll";
import i18n from "../../utils/i18n";
import { PollDetailQuestionChoiceViewModel } from "./PollDetailQuestionChoiceViewModel";
import { QuestionChoiceRowViewModel } from "./QuestionChoiceRowViewModel";

export const PollDetailQuestionSingleChoiceViewModelMapper = {
  map: (question: Question, answer: SingleChoiceAnswer): PollDetailQuestionChoiceViewModel => {
    return {
      title: question.content,
      subtitle: i18n.t("polldetail.question_unique_choice"),
      answers: question.choices.map((choice): QuestionChoiceRowViewModel => {
        return {
          id: choice.id.toString(),
          title: choice.content,
          isSelected: answer.choiceId === choice.id,
        };
      }),
    };
  },
};
