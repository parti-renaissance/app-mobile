import { HomeHeaderViewModel } from './HomeHeader'
import { HomeSectionViewModel } from './HomeRowViewModel'

export interface HomeViewModel {
  header: HomeHeaderViewModel
  rows: ReadonlyArray<HomeSectionViewModel>
}
