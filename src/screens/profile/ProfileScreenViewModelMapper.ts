import { Department } from '../../core/entities/Department'
import { Profile } from '../../core/entities/Profile'
import i18n from '../../utils/i18n'
import { ProfilePollsCompletedViewModelMapper } from './ProfilePollsCompletedViewModelMapper'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'

export const ProfileScreenViewModelMapper = {
  map: (profile: Profile, department: Department): ProfileScreenViewModel => {
    return {
      region: i18n.t('profile.localisation1', {
        region: department.region.name,
      }),
      area: i18n.t('profile.localisation2', {
        area: department.name,
        postalCode: profile.zipCode,
      }),
      name: i18n.t('profile.name', {
        firstName: profile.firstName,
        lastName: profile.lastName,
      }),
      polls: ProfilePollsCompletedViewModelMapper.map(profile),
    }
  },
}
