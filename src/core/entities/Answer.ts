export interface TextAnswer {
  value: string
}

export interface SingleChoiceAnswer {
  choiceId: number
}

export interface MultipleChoicesAnswer {
  choiceIds: Array<number>
}

export const isTextAnswer = (
  answer: TextAnswer | SingleChoiceAnswer | MultipleChoicesAnswer,
): boolean => {
  return 'value' in answer
}

export const isSingleChoiceAnswer = (
  answer: TextAnswer | SingleChoiceAnswer | MultipleChoicesAnswer,
): boolean => {
  return 'choiceId' in answer
}

export const isMultipleChoicesAnswer = (
  answer: TextAnswer | SingleChoiceAnswer | MultipleChoicesAnswer,
): boolean => {
  return 'choiceIds' in answer
}

export interface Answer {
  questionId: number
  answer: TextAnswer | SingleChoiceAnswer | MultipleChoicesAnswer
}
