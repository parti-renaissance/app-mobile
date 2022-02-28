import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { HomeFeedActionCampaignCardViewModel } from '../HomeFeedActionCampaignCard'
import { logWaringsIfNeeded } from './logWarningsIfNeeded'

export const HomeFeedActionCampaignCardViewModelFromTimelineItemMapper = {
  map: (item: TimelineFeedItem): HomeFeedActionCampaignCardViewModel => {
    const description = item.description ?? ''
    logWaringsIfNeeded(item, ['imageUri', 'description'])

    return {
      id: item.uuid,
      imageUri: item.imageUri,
      title: item.title,
      subtitle: description,
    }
  },
}
