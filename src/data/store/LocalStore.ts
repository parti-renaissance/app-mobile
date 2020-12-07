import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserPreferences } from '../../core/entities/UserPreferences'
import { Credentials } from './Credentials'

const KEY_CREDENTIALS = 'credentials'
const USER_PREFERENCES = 'userPreferences'

class LocalStore {
  private static instance: LocalStore
  private constructor() {}

  storeCredentials(credentials: Credentials): Promise<void> {
    const jsonValue = JSON.stringify(credentials)
    return AsyncStorage.setItem(KEY_CREDENTIALS, jsonValue)
  }

  getCredentials(): Promise<Credentials | null> {
    return AsyncStorage.getItem(KEY_CREDENTIALS).then(this.parseJSON)
  }

  clearCredentials(): Promise<void> {
    return AsyncStorage.removeItem(KEY_CREDENTIALS)
  }

  async storeZipCode(zipCode: string): Promise<void> {
    await this.storeUserPreference({ zipCode: zipCode })
  }

  async storeThemeId(themeId: string): Promise<void> {
    await this.storeUserPreference({ themeId: themeId })
  }

  getUserPreferences(): Promise<UserPreferences | null> {
    return AsyncStorage.getItem(USER_PREFERENCES).then(this.parseJSON)
  }

  clearPreferences(): Promise<void> {
    return AsyncStorage.removeItem(USER_PREFERENCES)
  }

  public static getInstance(): LocalStore {
    if (!LocalStore.instance) {
      LocalStore.instance = new LocalStore()
    }

    return LocalStore.instance
  }

  private async storeUserPreference(
    object: {
      [key in keyof UserPreferences]?: any
    },
  ): Promise<void> {
    const preferences = await this.getUserPreferences()
    const newPreferences = { ...preferences, ...object }
    return AsyncStorage.setItem(
      USER_PREFERENCES,
      JSON.stringify(newPreferences),
    )
  }

  private parseJSON(value: string | null): any {
    return value != null ? JSON.parse(value) : null
  }
}

export default LocalStore
