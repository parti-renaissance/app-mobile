export interface PollExtraQuestionPage {
  description: string | null
  questions: Array<PollExtraQuestion>
}

export type PollExtraQuestionType =
  | 'choice'
  | 'text'
  | 'compound'
  | 'dualChoice'

export interface PollExtraQuestion {
  code: string
  type: PollExtraQuestionType
  dependency?: PollExtraQuestionDependency
  options: PollExtraQuestionOptions
}

export interface PollExtraQuestionDependency {
  question: string
  choices: Array<string>
}

export interface PollExtraQuestionChoiceOptions {
  title: string
  subtitle?: string
  required: boolean
  columns: number
  multiple: boolean
  choices: Array<PollExtraQuestionChoice>
}

export interface PollExtraQuestionDualChoiceOptions {
  title: string
  subtitle?: string
  required: boolean
}

export interface PollExtraQuestionChoice {
  code: string
  label: string
}

export interface PollExtraQuestionTextOptions {
  label: string
  required: boolean
  placeholder: string
}

export interface PollExtraQuestionCompoundOptions {
  label: string
  required: boolean
  children: Array<PollExtraQuestion>
}

export type PollExtraQuestionOptions =
  | PollExtraQuestionChoiceOptions
  | PollExtraQuestionTextOptions
  | PollExtraQuestionCompoundOptions
  | PollExtraQuestionDualChoiceOptions
