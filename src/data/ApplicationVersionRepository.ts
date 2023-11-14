import LocalStore from './store/LocalStore'

class ApplicationVersionRepository {
  private static instance: ApplicationVersionRepository
  private localStore = LocalStore.getInstance()

  public currentVersionCode(): number {
    // TODO: (Pierre Felgines) 2022/02/17 May be a good idea to link
    // this version code with native apps version code
    return 3
  }

  public async previousVersionCode(): Promise<number> {
    const applicationVersion =
      await this.localStore.getPreviousApplicationVersion()
    if (applicationVersion == null) {
      return NO_APPLICATION_VERSION_CODE
    } else {
      return applicationVersion
    }
  }

  public async setPreviousVersionCode(versionCode: number): Promise<void> {
    return this.localStore.setPreviousApplicationVersion(versionCode)
  }

  public static getInstance(): ApplicationVersionRepository {
    if (!ApplicationVersionRepository.instance) {
      ApplicationVersionRepository.instance = new ApplicationVersionRepository()
    }

    return ApplicationVersionRepository.instance
  }
}

export const NO_APPLICATION_VERSION_CODE = -1

export default ApplicationVersionRepository
