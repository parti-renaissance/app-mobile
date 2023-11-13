import { MultipleChoicesAnswer } from "../../core/entities/Answer";
import { Question } from "../../core/entities/Poll";
import i18n from "../../utils/i18n";
import { PollDetailQuestionChoiceViewModel } from "./PollDetailQuestionChoiceViewModel";
import { QuestionChoiceRowViewModel } from "./QuestionChoiceRowViewModel";

export const PollDetailQuestionMultipleChoicesViewModelMapper = {
  map: (question: Question, answer: MultipleChoicesAnswer): PollDetailQuestionChoiceViewModel => {
    return {
      title: question.content,
      subtitle: i18n.t("polldetail.question_multiple_choices"),
      answers: question.choices.map((choice): QuestionChoiceRowViewModel => {
        return {
          id: choice.id.toString(),
          title: choice.content,
          isSelected: answer.choiceIds.includes(choice.id),
        };
      }),
    };
  },
};
