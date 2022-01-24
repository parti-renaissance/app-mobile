import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'

export interface ProfileScreenViewModel {
  region: string
  area: string
  name?: string
  polls: ProfilePollsCompletedViewModel
}
