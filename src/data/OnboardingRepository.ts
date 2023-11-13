import { HeaderInfos } from "../core/entities/HeaderInfos";
import { DataSource } from "./DataSource";
import { HeaderInfosMapper } from "./mapper/HeaderInfosMapper";
import ApiService from "./network/ApiService";
import { RestHeaderInfos } from "./restObjects/RestHeaderInfos";
import CacheManager from "./store/CacheManager";

export class OnboardingRepository {
  private static instance: OnboardingRepository;
  private apiService = ApiService.getInstance();
  private cacheManager = CacheManager.getInstance();
  private constructor() {}

  public async getOnboardingHeader(dataSource: DataSource = "remote"): Promise<HeaderInfos> {
    const cacheKey = "onboardingHeader";
    let result: RestHeaderInfos;
    switch (dataSource) {
      case "cache":
        result = await this.cacheManager.getFromCache(cacheKey);
        break;
      case "remote":
        result = await this.apiService.getLoginHeader();
        await this.cacheManager.setInCache(cacheKey, result);
        break;
    }
    return HeaderInfosMapper.map(result);
  }

  public static getInstance(): OnboardingRepository {
    if (!OnboardingRepository.instance) {
      OnboardingRepository.instance = new OnboardingRepository();
    }
    return OnboardingRepository.instance;
  }
}
