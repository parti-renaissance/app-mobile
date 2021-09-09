import { PhoningTutorialRowViewModel } from './tutorial/PhoningTutorialRow'

export interface PhoningSectionRowViewModel {
  sectionName?: string
}

export type PhoningRowViewModel = {
  type: 'tutorial'
  value: PhoningTutorialRowViewModel
}
