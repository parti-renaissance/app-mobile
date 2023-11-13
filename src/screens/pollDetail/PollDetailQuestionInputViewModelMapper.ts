import { TextAnswer } from "../../core/entities/Answer";
import { Question } from "../../core/entities/Poll";
import { PollDetailQuestionInputViewModel } from "./PollDetailQuestionInputViewModel";

export const PollDetailQuestionInputViewModelMapper = {
  map: (question: Question, answer: TextAnswer): PollDetailQuestionInputViewModel => {
    return {
      title: question.content,
      content: {
        id: question.id.toString(),
        text: answer.value,
      },
    };
  },
};
