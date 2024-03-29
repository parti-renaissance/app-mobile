import { PhoningCallContactRowViewModel } from './callContact/CallContactRow'
import { PhoningCampaignRowViewModel } from './campaign/PhoningCampaignRow'
import { PhoningTutorialRowViewModel } from './tutorial/PhoningTutorialRow'

export type PhoningRowViewModel =
  | {
      type: 'tutorial'
      value: PhoningTutorialRowViewModel
    }
  | {
      type: 'callContact'
      value: PhoningCallContactRowViewModel
    }
  | {
      type: 'campaign'
      value: PhoningCampaignRowViewModel
    }
