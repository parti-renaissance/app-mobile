import { DetailedProfile } from "../core/entities/DetailedProfile";
import { Profile } from "../core/entities/Profile";
import { UserScope } from "../core/entities/UserScope";
import { PersonalInformationsForm } from "../screens/personalInformation/PersonalInformationsForm";
import { DataSource } from "./DataSource";
import { ProfileMapper } from "./mapper/ProfileMapper";
import { ProfileUpdateMapper } from "./mapper/ProfileUpdateMapper";
import { UserScopeMapper } from "./mapper/UserScopeMapper";
import ApiService from "./network/ApiService";
import { RestProfileResponse } from "./restObjects/RestProfileResponse";
import CacheManager from "./store/CacheManager";
import LocalStore from "./store/LocalStore";

class ProfileRepository {
  private static instance: ProfileRepository;
  private apiService = ApiService.getInstance();
  private localStore = LocalStore.getInstance();
  private cacheManager = CacheManager.getInstance();
  private constructor() {}

  public async getProfile(dataSource: DataSource = "remote"): Promise<Profile> {
    const cacheKey = "profile";
    let result: RestProfileResponse;
    switch (dataSource) {
      case "cache":
        result = await this.cacheManager.getFromCache(cacheKey);
        break;
      case "remote":
        result = await this.apiService.getProfile();
        await this.cacheManager.setInCache(cacheKey, result);
        break;
    }
    const profile = ProfileMapper.map(result);
    this.saveZipCode(profile.zipCode);
    return profile;
  }

  public async getDetailedProfile(): Promise<DetailedProfile> {
    const response = await this.apiService.getDetailedProfile();
    const profile = ProfileMapper.mapDetailedProfile(response);

    const zipCode = profile.address?.postalCode;
    if (zipCode) {
      this.saveZipCode(zipCode);
    }
    return profile;
  }

  public async updateDetailedProfile(
    profileUuid: string,
    newProfile: PersonalInformationsForm,
  ): Promise<void> {
    await this.apiService.updateProfile(
      profileUuid,
      ProfileUpdateMapper.mapPersonalInformationForm(newProfile),
    );
  }

  public async getZipCode(): Promise<string> {
    const userPreferences = await this.localStore.getUserPreferences();
    if (userPreferences?.zipCode) {
      return userPreferences.zipCode;
    } else {
      throw new Error("Zipcode not found for user");
    }
  }

  public async getCityFromPostalCode(postalCode: string): Promise<string | undefined> {
    return this.apiService.getCityFromPostalCode(postalCode);
  }

  public async saveZipCode(zipCode: string): Promise<void> {
    await this.localStore.storeZipCode(zipCode);
  }

  public updateDeviceZipCode(deviceId: string, zipCode: string): Promise<void> {
    const request = {
      postal_code: zipCode,
    };
    return this.apiService.updateDeviceZipCode(deviceId, request);
  }

  public async getUserScopes(): Promise<Array<UserScope>> {
    const restScopes = await this.apiService.getUserScopes();
    return UserScopeMapper.map(restScopes);
  }

  public async removeAccount(): Promise<void> {
    return this.apiService.removeProfile();
  }

  public static getInstance(): ProfileRepository {
    if (!ProfileRepository.instance) {
      ProfileRepository.instance = new ProfileRepository();
    }
    return ProfileRepository.instance;
  }
}

export default ProfileRepository;
