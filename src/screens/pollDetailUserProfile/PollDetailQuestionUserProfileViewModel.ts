import { QuestionChoiceRowViewModel } from '../pollDetail/QuestionChoiceRowViewModel'
import { QuestionGenderRowViewModel } from './QuestionGenderRowViewModel'

export type PollDetailQuestionUserProfileSectionContentViewModel =
  | { type: 'gender'; value: QuestionGenderRowViewModel }
  | { type: 'choice'; value: QuestionChoiceRowViewModel }

export interface PollDetailQuestionUserProfileSectionViewModel {
  id: string
  title: string
  data: Array<PollDetailQuestionUserProfileSectionContentViewModel>
}

export interface PollDetailQuestionUserProfileViewModel {
  sections: Array<PollDetailQuestionUserProfileSectionViewModel>
}
