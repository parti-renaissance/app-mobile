import { TextInputProps } from "react-native";
import { QuestionDualChoiceRowViewModel } from "./QuestionDualChoiceRowViewModel";
import { QuestionTextLinkRowViewModel } from "./QuestionTextLinkRowViewModel";

export interface QuestionTextInputRowViewModel {
  id: string;
  title: string;
  placeholder?: string;
  value: string;
  autocapitalize: TextInputProps["autoCapitalize"];
  keyboardType: TextInputProps["keyboardType"];
  maxLength?: number;
}

// (Pierre Felgines) Hack for enum with associated value
export type PollDetailQuestionUserDataSectionContentViewModel =
  | { type: "textLink"; value: QuestionTextLinkRowViewModel }
  | { type: "dualChoice"; value: QuestionDualChoiceRowViewModel }
  | { type: "textInput"; value: QuestionTextInputRowViewModel };

export interface PollDetailQuestionUserDataSectionViewModel {
  id: string;
  title: string;
  data: Array<PollDetailQuestionUserDataSectionContentViewModel>;
}

export interface PollDetailQuestionUserDataViewModel {
  sections: Array<PollDetailQuestionUserDataSectionViewModel>;
}
