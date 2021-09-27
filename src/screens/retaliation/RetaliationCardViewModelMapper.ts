import { ImageSourcePropType } from 'react-native'
import {
  Retaliation,
  RetaliationSiteType,
} from '../../core/entities/Retaliation'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'

export const RetaliationCardViewModelMapper = {
  map: (retaliation: Retaliation): RetaliationCardViewModel => {
    return {
      id: retaliation.id,
      socialIcon: mapRetaliationIconImage(
        retaliation.openGraph?.site ?? 'others',
      ),
      image: retaliation.openGraph?.image ?? '',
      title: retaliation.title,
      body: retaliation.body,
      url: retaliation.sourceUrl,
    }
  },
}

function mapRetaliationIconImage(
  site: RetaliationSiteType,
): ImageSourcePropType {
  switch (site) {
    case 'facebook':
      return require('../../assets/images/facebook.png')
    case 'twitter':
      return require('../../assets/images/twitter.png')
    case 'others':
      return require('../../assets/images/otherSocialNetwork.png')
  }
}
