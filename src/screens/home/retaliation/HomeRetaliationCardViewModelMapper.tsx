import { Retaliation } from '../../../core/entities/Retaliation'
import { HomeRetaliationCardViewModel } from './HomeRetaliationCardViewModel'
import { RetaliationSocialIconImageMapper } from './RetaliationSocialIconImageMapper'

export const HomeRetaliationCardViewModelMapper = {
  map: (retaliation: Retaliation): HomeRetaliationCardViewModel => {
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
