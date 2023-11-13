export interface RestPollConfigQuestionPage {
  description: string | null;
  questions: Array<RestPollConfigQuestion>;
}

export type RestPollConfigQuestionType = "choice" | "text" | "boolean" | "compound";

export interface RestPollConfigQuestion {
  code: string;
  type: RestPollConfigQuestionType;
  dependency?: RestPollConfigQuestionDependency;
  options: RestPollConfigQuestionOptions;
}

export interface RestPollConfigQuestionDependency {
  question: string;
  choices: Array<string | boolean>;
}

export type RestPollConfigQuestionWidgetType = "single_row" | "cols_1" | "cols_2";

export interface RestPollConfigQuestionChoiceOptions {
  label: string;
  required: boolean;
  widget: RestPollConfigQuestionWidgetType;
  multiple: boolean;
  choices: Map<string, string>;
}

export interface RestPollConfigQuestionTextOptions {
  label: string;
  required: boolean;
  placeholder: string;
}

export interface RestPollConfigQuestionBooleanOptions {
  label: string;
  required: boolean;
  help: string;
}

export interface RestPollConfigQuestionCompounOptions {
  label: string;
  required: boolean;
  children: Array<RestPollConfigQuestion>;
}

export type RestPollConfigQuestionOptions =
  | RestPollConfigQuestionChoiceOptions
  | RestPollConfigQuestionTextOptions
  | RestPollConfigQuestionBooleanOptions
  | RestPollConfigQuestionCompounOptions;
