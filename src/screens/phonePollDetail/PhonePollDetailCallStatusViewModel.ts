import { QuestionChoiceRowViewModel } from '../pollDetail/QuestionChoiceRowViewModel'

export interface PhonePollDetailCallStatusViewModel {
  isActionEnabled: boolean
  choices: Array<QuestionChoiceRowViewModel>
}
