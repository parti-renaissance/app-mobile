import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { Notification, NotificationCategory } from '../entities/Notification'

export class GetNotificationsInteractor {
  private personalInformationRepository = PersonalInformationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()
  public async execute(
    category: NotificationCategory,
  ): Promise<GetNotificationsInteractorResult> {
    const allNotifications = await this.personalInformationRepository.getAvailableNotifications()
    const notifications = allNotifications.filter(
      (notification) => notification.category === category,
    )
    const profile = await this.profileRepository.getDetailedProfile()
    return {
      isPushEnabled: true, // TODO fetch push info from settings
      notifications: notifications,
      notificationsEnabled: profile.subscriptions,
    }
  }
}

export interface GetNotificationsInteractorResult {
  isPushEnabled: boolean
  notifications: Array<Notification>
  notificationsEnabled: Array<string>
}
