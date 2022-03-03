import { TimelineFeedItemRetaliation } from '../../../../core/entities/TimelineFeedItem'
import { HomeRetaliationCardViewModel } from '../../retaliation/HomeRetaliationCardViewModel'
import { RetaliationSocialIconImageMapper } from '../../retaliation/RetaliationSocialIconImageMapper'

export const HomeRetaliationCardViewModelFromTimelineRetaliationMapper = {
  map: (item: TimelineFeedItemRetaliation): HomeRetaliationCardViewModel => {
    return {
      id: item.uuid,
      title: item.title,
      body: item.description,
      url: item.url,
      socialIcon: RetaliationSocialIconImageMapper.map(item.mediaType),
    }
  },
}
