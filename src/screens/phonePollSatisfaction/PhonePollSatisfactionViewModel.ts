import { QuestionDualChoiceRowViewModel } from '../pollDetailUserData/QuestionDualChoiceRowViewModel'
import { QuestionRateRowViewModel } from './rate/QuestionRateRowViewModel'

export type PhonePollSatisfactionSectionBooleanViewModel = {
  type: 'boolean'
  value: QuestionDualChoiceRowViewModel
}

export type PhonePollSatisfactionSectionRateViewModel = {
  type: 'rate'
  value: QuestionRateRowViewModel
}

// TODO: (Pierre Felgines) Add union type with other types of content
export type PhonePollSatisfactionSectionContentViewModel =
  | PhonePollSatisfactionSectionBooleanViewModel
  | PhonePollSatisfactionSectionRateViewModel

export interface PhonePollSatisfactionSectionViewModel {
  id: string
  title: string
  data: Array<PhonePollSatisfactionSectionContentViewModel>
}

export interface PhonePollSatisfactionViewModel {
  sections: Array<PhonePollSatisfactionSectionViewModel>
}
