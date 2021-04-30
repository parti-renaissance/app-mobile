import AuthenticationRepository from '../../data/AuthenticationRepository'
import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import PushRepository from '../../data/PushRepository'
import { AuthenticationState } from '../entities/AuthenticationState'
import { Notification, NotificationCategory } from '../entities/Notification'

export class GetNotificationsInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private personalInformationRepository = PersonalInformationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  private pushRepository = PushRepository.getInstance()
  public async execute(
    category: NotificationCategory,
  ): Promise<GetNotificationsInteractorResult> {
    const state = await this.authenticationRepository.getAuthenticationState()
    if (state === AuthenticationState.Authenticated) {
      const allNotifications = await this.personalInformationRepository.getAvailableNotifications()
      const notifications = allNotifications.filter(
        (notification) => notification.category === category,
      )
      const profile = await this.profileRepository.getDetailedProfile()
      const pushEnabled = await this.pushRepository.arePushNotificationsEnabled(
        category,
      )
      return {
        userUuid: profile.uuid,
        isPushEnabled: pushEnabled,
        notifications: notifications,
        notificationsEnabled: profile.subscriptions,
      }
    } else {
      const pushEnabled = await this.pushRepository.arePushNotificationsEnabled(
        category,
      )
      return {
        userUuid: '',
        isPushEnabled: pushEnabled,
        notifications: [],
        notificationsEnabled: [],
      }
    }
  }
}

export interface GetNotificationsInteractorResult {
  userUuid: string
  isPushEnabled: boolean
  notifications: Array<Notification>
  notificationsEnabled: Array<string>
}
