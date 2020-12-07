import { HomeSectionViewModel } from './HomeRowViewModel'

export interface HomeViewModel {
  title: string
  rows: ReadonlyArray<HomeSectionViewModel>
}
