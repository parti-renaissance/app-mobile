import { PhoningSectionViewModel } from './PhoningRowViewModel'

export interface PhoningViewModel {
  title: string
  rows: ReadonlyArray<PhoningSectionViewModel>
}
