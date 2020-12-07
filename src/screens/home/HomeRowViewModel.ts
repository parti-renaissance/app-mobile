import { PollRowViewModel } from '../polls/PollRowViewModel'
import { RegionViewModel } from '../regions/RegionViewModel'
import { HomeNewsRowViewModel } from './HomeNewsRowViewModel'
import { HomeToolRowViewModel } from './HomeToolRowViewModel'

export interface HomeSectionRowViewModel {
  sectionName: string
}

export interface HomeNewsRowContainerViewModel {
  news: Array<HomeNewsRowViewModel>
}

export interface HomePollsRowContainerViewModel {
  polls: Array<PollRowViewModel>
}

export interface HomeToolsRowContainerViewModel {
  tools: Array<HomeToolRowViewModel>
}

export type HomeSectionViewModel = {
  id: string
  sectionViewModel?: HomeSectionRowViewModel
  data: Array<HomeRowViewModel>
}

export type HomeRowViewModel =
  | {
      type: 'region'
      value: RegionViewModel
    }
  | {
      type: 'news'
      value: HomeNewsRowContainerViewModel
    }
  | {
      type: 'polls'
      value: HomePollsRowContainerViewModel
    }
  | {
      type: 'tools'
      value: HomeToolsRowContainerViewModel
    }
  | {
      type: 'adhere'
    }
