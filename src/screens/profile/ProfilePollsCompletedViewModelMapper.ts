import { Profile } from '../../core/entities/Profile'
import i18n from '../../utils/i18n'
import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'

export const ProfilePollsCompletedViewModelMapper = {
  map: (profile: Profile): ProfilePollsCompletedViewModel => {
    return {
      completedThisMonth: profile.totalSurveysLastMonth.toString(),
      completed: profile.totalSurveys.toString(),
    }
  },
  empty: (): ProfilePollsCompletedViewModel => {
    return {
      completedThisMonth: i18n.t('common.noDataPlaceholder'),
      completed: i18n.t('common.noDataPlaceholder'),
    }
  },
}
