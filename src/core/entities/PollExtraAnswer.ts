export interface PollExtraTextAnswer {
  value: string
}

export interface PollExtraSingleChoiceAnswer {
  choiceId: string
}

export interface PollExtraMultipleChoicesAnswer {
  choiceIds: Array<string>
}

export interface PollExtraCompoundAnswer {
  values: Map<string, string>
}

export interface PollExtraAnswer {
  questionId: string
  answer:
    | PollExtraTextAnswer
    | PollExtraSingleChoiceAnswer
    | PollExtraMultipleChoicesAnswer
    | PollExtraCompoundAnswer
}
