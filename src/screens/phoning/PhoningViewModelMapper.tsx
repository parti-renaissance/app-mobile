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
    const remainingDays = Math.floor(
      (campaign.finishAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    )
    const subtitle =
      campaign.permanent === false
        ? i18n.t('phoning.campaign.remainingdays', {
            remainingdays: remainingDays,
          })
        : i18n.t('phoning.campaign.permanent.subtitle')
    rows.push({
      type: 'campaign',
      value: {
        id: campaign.id,
        title: campaign.title,
        subtitle: subtitle,
        calledCount: campaign.callsCount,
        numberOfPersonToCall: campaign.goal,
        rank:
          campaign.scoreboard.find((e) => e.caller)?.position || DEFAULT_RANK,
      },
    })
  })
}

const DEFAULT_RANK = 1
