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
    if (headerInfos !== undefined) {
      return {
        imageUri: headerInfos.imageUri,
        bannerHeading: headerInfos.prefix,
        bannerTitle: headerInfos.slogan,
        greeting: headerInfos.content,
      }
    } else {
      return {
        // TODO: (Pierre Felgines) 2022/03/01 Change image
        imageUri: 'https://via.placeholder.com/700',
        bannerHeading: i18n.t('home.banner.heading'),
        bannerTitle: i18n.t('home.banner.title'),
        greeting: greeting(profile),
      }
    }
  },
}
