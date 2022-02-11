import { EventRowViewModel } from '../events/EventViewModel'
import { NewsRowViewModel } from '../news/NewsRowViewModel'
import { PollRowViewModel } from '../polls/PollRowViewModel'
import { RegionViewModel } from '../regions/RegionViewModel'
import { HomeFeedActionCampaignsCardViewModel } from './feed/HomeFeedActionCampaignsCard'
import { HomeNewsRowViewModel } from './news/HomeNewsRowViewModel'
import { HomeQuickPollRowAnswerViewModel } from './quickPoll/HomeQuickPollRowAnswerViewModel'
import { HomeRetaliationCardViewModel } from './retaliation/HomeRetaliationCardViewModel'
import { HomeToolRowViewModel } from './tools/HomeToolRowViewModel'

export interface HomeSectionRowViewModel {
  sectionName: string
  isHighlighted: boolean
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

export interface HomeQuickPollRowContainerViewModel {
  id: string
  title: string
  type: 'results' | 'question'
  leadingAnswerViewModel: HomeQuickPollRowAnswerViewModel
  trailingAnswerViewModel: HomeQuickPollRowAnswerViewModel
  totalVotes: string
}

export interface HomeRetaliationRowContainerViewModel {
  retaliations: Array<HomeRetaliationCardViewModel>
}

export interface HomeEventRowContainerViewModel {
  event: EventRowViewModel
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
      type: 'quick_poll'
      value: HomeQuickPollRowContainerViewModel
    }
  | {
      type: 'event'
      value: HomeEventRowContainerViewModel
    }
  | {
      type: 'retaliation'
      value: HomeRetaliationRowContainerViewModel
    }
  | {
      type: 'feedEvent'
      value: HomeEventRowContainerViewModel
    }
  | {
      type: 'feedNews'
      value: NewsRowViewModel
    }
  | {
      type: 'feedPhoningCampaigns'
      value: HomeFeedActionCampaignsCardViewModel
    }
