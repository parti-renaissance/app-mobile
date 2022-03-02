import { TimelineFeedItemRetaliation } from '../../../../core/entities/TimelineFeedItem'
import { HomeRetaliationCardViewModel } from '../../retaliation/HomeRetaliationCardViewModel'
import { RetaliationSocialIconImageMapper } from '../../retaliation/RetaliationSocialIconImageMapper'

export const HomeRetaliationCardViewModelFromTimelineRetaliationMapper = {
  map: (item: TimelineFeedItemRetaliation): HomeRetaliationCardViewModel => {
    return {
      id: item.uuid,
      title: item.title,
      body: item.description,
      url: '', // TODO: (Pierre Felgines) 2022/02/28 Missing url,
      socialIcon: RetaliationSocialIconImageMapper.map('facebook'), // TODO: (Pierre Felgines) 2022/02/28 Missing social icon
    }
  },
}
