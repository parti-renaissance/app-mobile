import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { HomeFeedActionCampaignCardViewModel } from '../HomeFeedActionCampaignCard'
import { logWarningsIfNeeded } from './logWarningsIfNeeded'

export const HomeFeedActionCampaignCardViewModelFromTimelineItemMapper = {
  map: (item: TimelineFeedItem): HomeFeedActionCampaignCardViewModel => {
    const description = item.description ?? ''
    logWarningsIfNeeded(item, ['imageUri', 'description'])

    return {
      id: item.uuid,
      imageUri: item.imageUri,
      title: item.title,
      subtitle: description,
    }
  },
}
