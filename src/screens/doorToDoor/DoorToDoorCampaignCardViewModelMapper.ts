import { DoorToDoorCampaignInfo } from '../../core/interactor/GetDoorToDoorCampaignInfoInteractor'
import { DateFormatter } from '../../utils/DateFormatter'
import i18n from '../../utils/i18n'
import { DoorToDoorCampaignCardViewModel } from './DoorToDoorCampaignCardViewModel'

export const DoorToDoorCampaignCardViewModelMapper = {
  map: (data: DoorToDoorCampaignInfo): DoorToDoorCampaignCardViewModel => {
    const date = new Date(data.campaign.finish_at)
    const surveys =
      data.ranking.individual.find((item) => item.current)?.surveys ?? 0
    return {
      campaignId: data.campaign.uuid,
      name: data.campaign.title,
      date: i18n.t('doorToDoor.campaign_deadline', {
        date: DateFormatter.format(date, i18n.t('doorToDoor.date_format')),
      }),
      goal: i18n.t('doorToDoor.goal_format', {
        current: surveys,
        goal: data.campaign.goal,
      }),
      progress: surveys / data.campaign.goal,
    }
  },
}
