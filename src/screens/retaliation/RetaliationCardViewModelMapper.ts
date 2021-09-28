import { RetaliationSocialIconImageMapper } from './../home/retaliation/RetaliationSocialIconImageMapper'
import { Retaliation } from '../../core/entities/Retaliation'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'

export const RetaliationCardViewModelMapper = {
  map: (retaliation: Retaliation): RetaliationCardViewModel => {
    return {
      id: retaliation.id,
      socialIcon: RetaliationSocialIconImageMapper.map(
        retaliation.openGraph?.site ?? 'others',
      ),
      image: retaliation.openGraph?.image ?? '',
      title: retaliation.openGraph?.title ?? '',
      body: retaliation.openGraph?.description ?? '',
      url: retaliation.sourceUrl,
    }
  },
}
