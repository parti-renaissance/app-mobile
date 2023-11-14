import { HeaderInfos } from '../../core/entities/HeaderInfos'
import { Profile } from '../../core/entities/Profile'
import i18n from '../../utils/i18n'
import { HomeHeaderViewModel } from './HomeHeader'

function greeting(profile?: Profile): string {
  if (profile) {
    const name = i18n.t('profile.name', {
      firstName: profile.firstName,
      lastName: profile.lastName,
    })
    return i18n.t('home.greeting_name', { username: name })
  } else {
    return i18n.t('home.greeting')
  }
}

export const HomeHeaderViewModelMapper = {
  map: (
    headerInfos: HeaderInfos | undefined,
    profile: Profile | undefined,
  ): HomeHeaderViewModel => {
    const image =
      headerInfos?.imageUri !== undefined
        ? { uri: headerInfos.imageUri }
        : require('../../assets/images/homeHeaderPlaceholder.jpg')

    if (headerInfos !== undefined) {
      return {
        image,
        bannerHeading: headerInfos.prefix,
        bannerTitle: headerInfos.slogan,
        greeting: headerInfos.content,
      }
    } else {
      return {
        image,
        bannerHeading: i18n.t('home.banner.heading'),
        bannerTitle: i18n.t('home.banner.title'),
        greeting: greeting(profile),
      }
    }
  },
}
