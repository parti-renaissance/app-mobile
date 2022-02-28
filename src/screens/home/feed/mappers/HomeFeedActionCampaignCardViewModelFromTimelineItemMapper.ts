import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { HomeFeedActionCampaignCardViewModel } from '../HomeFeedActionCampaignCard'

export const HomeFeedActionCampaignCardViewModelFromTimelineItemMapper = {
  map: (item: TimelineFeedItem): HomeFeedActionCampaignCardViewModel => {
    return {
      id: item.uuid,
      imageUri: item.imageUri ?? '',
      title: item.title,
      subtitle: item.description ?? '',
    }
  },
}
