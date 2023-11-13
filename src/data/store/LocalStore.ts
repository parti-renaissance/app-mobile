import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserPreferences } from "../../core/entities/UserPreferences";
import { Credentials } from "./Credentials";
import { TopicsRegistration } from "./TopicsRegistration";

const KEY_CREDENTIALS = "credentials";
const USER_PREFERENCES = "userPreferences";
const TOPICS_REGISTRATION = "topicsRegistration";
const ANSWERED_QUICK_POLLS = "answeredQuickPolls";
const PREVIOUS_APPLICATION_VERSION = "previousApplicationVersion";

class LocalStore {
  private static instance: LocalStore;
  private constructor() {}

  storeCredentials(credentials: Credentials): Promise<void> {
    const jsonValue = JSON.stringify(credentials);
    return AsyncStorage.setItem(KEY_CREDENTIALS, jsonValue);
  }

  getCredentials(): Promise<Credentials | null> {
    return AsyncStorage.getItem(KEY_CREDENTIALS).then(this.parseJSON);
  }

  clearCredentials(): Promise<void> {
    return AsyncStorage.removeItem(KEY_CREDENTIALS);
  }

  async storeZipCode(zipCode: string): Promise<void> {
    await this.storeUserPreference({ zipCode: zipCode });
  }

  getUserPreferences(): Promise<UserPreferences | null> {
    return AsyncStorage.getItem(USER_PREFERENCES).then(this.parseJSON);
  }

  clearPreferences(): Promise<void> {
    return AsyncStorage.removeItem(USER_PREFERENCES);
  }

  updateTopicsRegistration(registration: TopicsRegistration): Promise<void> {
    return this.storeTopicsRegistration(registration);
  }

  getTopicsRegistration(): Promise<TopicsRegistration | null> {
    return AsyncStorage.getItem(TOPICS_REGISTRATION).then(this.parseJSON);
  }

  clearTopicsRegistration(): Promise<void> {
    return AsyncStorage.removeItem(TOPICS_REGISTRATION);
  }

  getPreviousApplicationVersion(): Promise<number | null> {
    return AsyncStorage.getItem(PREVIOUS_APPLICATION_VERSION).then((version) => {
      if (version != null) {
        return parseInt(version, 10);
      } else {
        return version;
      }
    });
  }

  setPreviousApplicationVersion(previousApplicationVersion: number): Promise<void> {
    return AsyncStorage.setItem(
      PREVIOUS_APPLICATION_VERSION,
      previousApplicationVersion.toString(),
    );
  }

  async storeAnsweredQuickPoll(quickPollId: string): Promise<void> {
    const pollsIds = await this.getAnsweredQuickPolls();
    const jsonValue = JSON.stringify(pollsIds + quickPollId);
    await AsyncStorage.setItem(ANSWERED_QUICK_POLLS, jsonValue);
  }

  async getAnsweredQuickPolls(): Promise<Array<string>> {
    const rawValue = await AsyncStorage.getItem(ANSWERED_QUICK_POLLS);
    const value = this.parseJSON(rawValue);
    return value ?? [];
  }

  public static getInstance(): LocalStore {
    if (!LocalStore.instance) {
      LocalStore.instance = new LocalStore();
    }

    return LocalStore.instance;
  }

  private async storeUserPreference(object: {
    [key in keyof UserPreferences]?: any;
  }): Promise<void> {
    const preferences = await this.getUserPreferences();
    const newPreferences = { ...preferences, ...object };
    return AsyncStorage.setItem(USER_PREFERENCES, JSON.stringify(newPreferences));
  }

  private async storeTopicsRegistration(object: {
    [key in keyof TopicsRegistration]?: any;
  }): Promise<void> {
    const topicsRegistration = await this.getTopicsRegistration();
    const newTopicsRegistration = { ...topicsRegistration, ...object };
    return AsyncStorage.setItem(TOPICS_REGISTRATION, JSON.stringify(newTopicsRegistration));
  }

  private parseJSON(value: string | null): any {
    return value != null ? JSON.parse(value) : null;
  }
}

export default LocalStore;
