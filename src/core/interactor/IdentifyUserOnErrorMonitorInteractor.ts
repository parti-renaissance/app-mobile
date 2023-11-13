import ProfileRepository from "../../data/ProfileRepository";
import { ErrorMonitor } from "../../utils/ErrorMonitor";

export class IdentifyUserOnErrorMonitorInteractor {
  private profileRepository = ProfileRepository.getInstance();

  public async execute() {
    try {
      const profile = await this.profileRepository.getProfile("remote");
      ErrorMonitor.setUser({ id: profile.uuid, email: profile.email });
    } catch {
      // no op
    }
  }
}
