import { Profile } from '../../core/entities/Profile'
import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'

export const ProfilePollsCompletedViewModelMapper = {
  map: (profile: Profile): ProfilePollsCompletedViewModel => {
    return {
      completedThisMonth: profile.totalSurveysLastMonth.toString(),
      completed: profile.totalSurveys.toString(),
    }
  },
  empty: (): ProfilePollsCompletedViewModel => {
    return { completedThisMonth: '-', completed: '-' }
  },
}
