import RegionTheme from '../core/entities/RegionTheme'
import { ThemeMapper } from './mapper/ThemeMapper'
import LocalStore from './store/LocalStore'

class ThemeRepository {
  private static instance: ThemeRepository
  private localStore = LocalStore.getInstance()
  private constructor() {}

  public async getRegionTheme(): Promise<RegionTheme> {
    const preferences = await this.localStore.getUserPreferences()
    if (!preferences?.themeId) {
      return RegionTheme.BLUE
    }
    return ThemeMapper.map(preferences.themeId)
  }

  public async saveRegionTheme(theme: RegionTheme) {
    await this.localStore.storeThemeId(ThemeMapper.id(theme))
  }

  public static getInstance(): ThemeRepository {
    if (!ThemeRepository.instance) {
      ThemeRepository.instance = new ThemeRepository()
    }
    return ThemeRepository.instance
  }
}

export default ThemeRepository
