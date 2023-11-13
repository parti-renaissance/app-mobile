import { QuestionChoiceRowViewModel } from "../../pollDetail/QuestionChoiceRowViewModel";

export interface SatisfactionQuestionChoiceViewModel {
  id: string;
  subtitle: string;
  answers: Array<QuestionChoiceRowViewModel>;
}
