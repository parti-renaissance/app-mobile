import { QuestionChoiceRowViewModel } from "../pollDetail/QuestionChoiceRowViewModel";

export interface QuestionDualChoiceRowViewModel {
  id: string;
  first: QuestionChoiceRowViewModel;
  second: QuestionChoiceRowViewModel;
}
