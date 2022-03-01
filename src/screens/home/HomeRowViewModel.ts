import { EventRowViewModel } from '../events/EventViewModel'
import { NewsRowViewModel } from '../news/NewsRowViewModel'
import { RegionViewModel } from '../regions/RegionViewModel'
import { ViewStateError } from '../shared/StatefulView'
import { HomeFeedActionCampaignCardViewModel } from './feed/HomeFeedActionCampaignCard'
import { HomeQuickPollRowAnswerViewModel } from './quickPoll/HomeQuickPollRowAnswerViewModel'
import { HomeRetaliationCardViewModel } from './retaliation/HomeRetaliationCardViewModel'

export interface HomeSectionRowViewModel {
  sectionName: string
  isHighlighted: boolean
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
      value: EventRowViewModel
    }
  | {
      type: 'feedNews'
      value: NewsRowViewModel
    }
  | {
      type: 'feedPhoningCampaign'
      value: HomeFeedActionCampaignCardViewModel
    }
  | {
      type: 'feedDoorToDoorCampaign'
      value: HomeFeedActionCampaignCardViewModel
    }
  | {
      type: 'feedPoll'
      value: HomeFeedActionCampaignCardViewModel
    }
  | {
      type: 'feedRetaliation'
      value: HomeRetaliationCardViewModel
    }
  | {
      type: 'error'
      value: ViewStateError
    }
