import { QuestionTextInputRowViewModel } from "../../../pollDetailUserData/PollDetailQuestionUserDataViewModel";

export interface QualificationFormUserDataViewModel {
  id: string;
  title: string;
  data: Array<QuestionTextInputRowViewModel>;
}
