import ApplicationVersionRepository, {
  NO_APPLICATION_VERSION_CODE,
} from "../../data/ApplicationVersionRepository";
import AuthenticationRepository from "../../data/AuthenticationRepository";
import ProfileRepository from "../../data/ProfileRepository";
import { AuthenticationState } from "../entities/AuthenticationState";

export class ApplicationUpgradeInteractor {
  private applicationVersionRepository = ApplicationVersionRepository.getInstance();
  private authenticationRepository = AuthenticationRepository.getInstance();
  private profileRepository = ProfileRepository.getInstance();
  public async execute(): Promise<void> {
    const currentVersion = this.applicationVersionRepository.currentVersionCode();
    const lastVersion = await this.lastVersionCompat(
      this.applicationVersionRepository.previousVersionCode(),
    );

    console.log(`Upgrading app from version ${lastVersion} to ${currentVersion}`);

    if (lastVersion !== NO_APPLICATION_VERSION_CODE) {
      this.performMigrations(currentVersion, lastVersion);
    }
    await this.applicationVersionRepository.setPreviousVersionCode(currentVersion);
  }

  private async performMigrations(currentVersion: number, lastVersion: number) {
    if (this.isUpgradingTo(2, currentVersion, lastVersion)) {
      console.log("migrating to version 2");
      const applicationState = await this.authenticationRepository.getAuthenticationState();
      if (applicationState === AuthenticationState.Anonymous) {
        const deviceId = await this.authenticationRepository.getDeviceId();
        const zipCode = await this.profileRepository.getZipCode();
        try {
          await this.profileRepository.updateDeviceZipCode(deviceId, zipCode);
        } catch (error) {
          console.log("migration failed: " + error);
        }
      }
      console.log("migration to version 2 DONE");
    }
  }

  private isUpgradingTo(
    migrationTarget: number,
    currentVersion: number,
    lastVersion: number,
  ): Boolean {
    return lastVersion < migrationTarget && lastVersion < currentVersion;
  }

  private async lastVersionCompat(lastVersionPromise: Promise<number>): Promise<number> {
    const lastVersion = await lastVersionPromise;
    if (lastVersion === NO_APPLICATION_VERSION_CODE) {
      const authenticationState = await this.authenticationRepository.getAuthenticationState();
      if (authenticationState !== AuthenticationState.Unauthenticated) {
        return 1;
      } else {
        return NO_APPLICATION_VERSION_CODE;
      }
    } else {
      return lastVersion;
    }
  }
}
