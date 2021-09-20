import { QuestionDualChoiceRowViewModel } from '../pollDetailUserData/QuestionDualChoiceRowViewModel'
import { SatisfactionQuestionChoiceViewModel } from './question/SatisfactionQuestionChoiceViewModel'
import { QuestionRateRowViewModel } from './rate/QuestionRateRowViewModel'

export type PhonePollSatisfactionSectionBooleanViewModel = {
  type: 'boolean'
  value: QuestionDualChoiceRowViewModel
}

export type PhonePollSatisfactionSectionRateViewModel = {
  type: 'rate'
  value: QuestionRateRowViewModel
}

export type PhonePollSatisfactionSectionChoiceViewModel = {
  type: 'single_choice'
  value: SatisfactionQuestionChoiceViewModel
}

// TODO: (Pierre Felgines) Add union type with other types of content
export type PhonePollSatisfactionSectionContentViewModel =
  | PhonePollSatisfactionSectionBooleanViewModel
  | PhonePollSatisfactionSectionRateViewModel
  | PhonePollSatisfactionSectionChoiceViewModel

export interface PhonePollSatisfactionSectionViewModel {
  id: string
  title: string
  data: Array<PhonePollSatisfactionSectionContentViewModel>
}

export interface PhonePollSatisfactionViewModel {
  sections: Array<PhonePollSatisfactionSectionViewModel>
}
