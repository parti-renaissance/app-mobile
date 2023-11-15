import { Retaliation } from '../../core/entities/Retaliation'
import { RetaliationListCardViewModel } from './RetaliationListCardViewModel'
import { RetaliationSocialIconImageMapper } from './RetaliationSocialIconImageMapper'

export const RetaliationListCardViewModelMapper = {
  map: (retaliation: Retaliation): RetaliationListCardViewModel => {
    return {
      id: retaliation.id,
      socialIcon: RetaliationSocialIconImageMapper.map(
        retaliation.openGraph?.site ?? 'others',
      ),
      title: retaliation.title,
      body: retaliation.body,
      url: retaliation.sourceUrl,
    }
  },
}
