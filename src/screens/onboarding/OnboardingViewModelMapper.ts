import { HeaderInfos } from '../../core/entities/HeaderInfos'
import i18n from '../../utils/i18n'
import { OnboardingViewModel } from './OnboardingViewModel'

export const OnboardingViewModelMapper = {
  map: (headerInfos: HeaderInfos | undefined): OnboardingViewModel => {
    const image =
      headerInfos?.imageUri !== undefined
        ? { uri: headerInfos.imageUri }
        : require('../../assets/images/backgroundUnauthenticatedHome.png')

    if (headerInfos !== undefined) {
      return {
        image,
        heading: headerInfos.prefix,
        title: headerInfos.slogan,
      }
    } else {
      return {
        image,
        heading: i18n.t('onboarding.title'),
        title: i18n.t('onboarding.title_rest'),
      }
    }
  },
}
