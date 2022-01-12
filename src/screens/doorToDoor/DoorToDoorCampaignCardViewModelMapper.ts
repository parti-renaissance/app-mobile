import moment from 'moment-timezone'
import { DoorToDoorCampaignInfo } from '../../core/interactor/GetDoorToDoorCampaignInfoInteractor'
import i18n from '../../utils/i18n'
import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'

export const DoorToDoorCampaignCardViewModelMapper = {
  map: (data: DoorToDoorCampaignInfo): DoorToDoorCampaignCardViewModel => {
    const date = moment(data.campaign.finish_at)
    const surveys =
      data.ranking.individual.find((item) => item.current)?.surveys ?? 0
    return {
      campaignId: data.campaign.uuid,
      name: data.campaign.title,
      date: i18n.t('doorToDoor.campaign_deadline', {
        date: date.format('DD MMM. YYYY'),
      }),
      goal: i18n.t('doorToDoor.goal_format', {
        current: surveys,
        goal: data.campaign.goal,
      }),
      progress: surveys / data.campaign.goal,
    }
  },
}
