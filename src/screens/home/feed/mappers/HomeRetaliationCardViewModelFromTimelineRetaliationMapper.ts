import { TimelineFeedItem } from '../../../../core/entities/TimelineFeedItem'
import { HomeRetaliationCardViewModel } from '../../retaliation/HomeRetaliationCardViewModel'
import { RetaliationSocialIconImageMapper } from '../../retaliation/RetaliationSocialIconImageMapper'
import { logWaringsIfNeeded } from './logWarningsIfNeeded'

export const HomeRetaliationCardViewModelFromTimelineRetaliationMapper = {
  map: (item: TimelineFeedItem): HomeRetaliationCardViewModel => {
    const description = item.description ?? ''
    logWaringsIfNeeded(item, ['description'])

    return {
      id: item.uuid,
      title: item.title,
      body: description,
      url: '', // TODO: (Pierre Felgines) 2022/02/28 Missing url,
      socialIcon: RetaliationSocialIconImageMapper.map('facebook'), // TODO: (Pierre Felgines) 2022/02/28 Missing social icon
    }
  },
}
