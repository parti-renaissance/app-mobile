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
  answer: PollExtraAnswerType
}

export type PollExtraAnswerType =
  | PollExtraTextAnswer
  | PollExtraSingleChoiceAnswer
  | PollExtraMultipleChoicesAnswer
  | PollExtraCompoundAnswer

// Custom TypeGuards
export function isPollExtraTextAnswer(
  obj: PollExtraAnswerType,
): obj is PollExtraTextAnswer {
  return (obj as PollExtraTextAnswer).value !== undefined
}

export function isPollExtraSingleChoiceAnswer(
  obj: PollExtraAnswerType,
): obj is PollExtraSingleChoiceAnswer {
  return (obj as PollExtraSingleChoiceAnswer).choiceId !== undefined
}

export function isPollExtraMultipleChoicesAnswer(
  obj: PollExtraAnswerType,
): obj is PollExtraMultipleChoicesAnswer {
  return (obj as PollExtraMultipleChoicesAnswer).choiceIds !== undefined
}

export function isPollExtraCompoundAnswer(
  obj: PollExtraAnswerType,
): obj is PollExtraCompoundAnswer {
  return (obj as PollExtraCompoundAnswer).values !== undefined
}
