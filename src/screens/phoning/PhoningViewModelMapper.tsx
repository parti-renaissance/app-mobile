import i18n from '../../utils/i18n'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningRowViewModel } from './PhoningRowViewModel'
import { PhoningCampaign } from '../../core/entities/PhoningCampaign'

export const PhoningViewModelMapper = {
  map: (campaigns: PhoningCampaign[]): PhoningViewModel => {
    const rows: Array<PhoningRowViewModel> = []
    if (campaigns.length > 0) {
      appendTutorial(rows)
    }
    appendCampaigns(campaigns, rows)
    appendCallContact(rows)

    return {
      title: i18n.t('phoning.title'),
      rows: rows,
    }
  },
}

function appendTutorial(rows: PhoningRowViewModel[]) {
  rows.push({
    type: 'tutorial',
    value: {
      id: 'tutorial',
    },
  })
}

function appendCampaigns(
  campaigns: PhoningCampaign[],
  rows: PhoningRowViewModel[],
) {
  campaigns.forEach((campaign) => {
    rows.push({
      type: 'campaign',
      value: {
        id: campaign.id,
        title: campaign.title,
        brief: campaign.brief,
        calledCount: campaign.callsCount,
        numberOfPersonToCall: campaign.goal,
        rank:
          campaign.scoreboard.find((e) => e.caller)?.position || DEFAULT_RANK,
      },
    })
  })
}

function appendCallContact(rows: PhoningRowViewModel[]) {
  rows.push({
    type: 'callContact',
    value: {
      id: 'callContact',
      calledCount: 75,
      numberOfPersonToCall: 134,
    },
  })
}

const DEFAULT_RANK = 1
