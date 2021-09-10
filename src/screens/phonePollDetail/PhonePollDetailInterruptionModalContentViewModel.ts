import { QuestionChoiceRowViewModel } from '../pollDetail/QuestionChoiceRowViewModel'

export interface PhonePollDetailInterruptionModalContentViewModel {
  isActionEnabled: boolean
  choices: Array<QuestionChoiceRowViewModel>
}
