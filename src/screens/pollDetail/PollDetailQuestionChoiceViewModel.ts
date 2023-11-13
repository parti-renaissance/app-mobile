import { QuestionChoiceRowViewModel } from "./QuestionChoiceRowViewModel";

export interface PollDetailQuestionChoiceViewModel {
  title: string;
  subtitle: string | undefined;
  answers: Array<QuestionChoiceRowViewModel>;
}
