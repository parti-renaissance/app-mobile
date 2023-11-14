export interface Choice {
  id: number
  content: string
}

type QuestionType = 'simple_field' | 'unique_choice' | 'multiple_choice'

export interface Question {
  id: number
  type: QuestionType
  content: string
  choices: Array<Choice>
}

type PollType = 'local' | 'national'

export interface Poll {
  uuid: string
  id: number
  type: PollType
  questions: Array<Question>
  name: string
  city?: string
}
