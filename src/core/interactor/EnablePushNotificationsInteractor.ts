import ProfileRepository from "../../data/ProfileRepository";
import PushRepository from "../../data/PushRepository";
import RegionsRepository from "../../data/RegionsRepository";
import { NotificationCategory } from "../entities/Notification";

export class EnablePushNotificationsInteractor {
  private pushRepository = PushRepository.getInstance();
  private profileRepository = ProfileRepository.getInstance();
  private regionsRepository = RegionsRepository.getInstance();
  public async execute(category: NotificationCategory, pushEnabled: boolean): Promise<void> {
    await this.pushRepository.enablePushNotifications(category, pushEnabled);
    switch (category) {
      case "national":
        await this.pushRepository.synchronizeGeneralTopicSubscription();
        break;
      case "local":
        const zipCode = await this.profileRepository.getZipCode();
        const department = await this.regionsRepository.getDepartment(zipCode);
        await this.pushRepository.synchronizeDepartmentSubscription(department);
        await this.pushRepository.synchronizeRegionSubscription(department.region);
        await this.pushRepository.synchronizeBoroughSubscription(zipCode);
        break;
    }
  }
}
