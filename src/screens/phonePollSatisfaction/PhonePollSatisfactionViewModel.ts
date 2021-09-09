import { QuestionDualChoiceRowViewModel } from '../pollDetailUserData/QuestionDualChoiceRowViewModel'

export type PhonePollSatisfactionSectionContentViewModel = {
  type: 'boolean'
  value: QuestionDualChoiceRowViewModel
} // TODO: (Pierre Felgines) Add union type with other types of content

export interface PhonePollSatisfactionSectionViewModel {
  id: string
  title: string
  data: Array<PhonePollSatisfactionSectionContentViewModel>
}

export interface PhonePollSatisfactionViewModel {
  sections: Array<PhonePollSatisfactionSectionViewModel>
}
