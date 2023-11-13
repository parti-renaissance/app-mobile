import { DataSource } from "../../data/DataSource";
import ProfileRepository from "../../data/ProfileRepository";
import RegionsRepository from "../../data/RegionsRepository";
import { Department } from "../entities/Department";
import { Profile } from "../entities/Profile";

export class ProfileAuthenticatedResult {
  public constructor(
    readonly profile: Profile,
    readonly department: Department,
  ) {}
}

export type GetUserProfileInteractorResult = ProfileAuthenticatedResult;

export class GetUserProfileInteractor {
  private profileRepository = ProfileRepository.getInstance();
  private regionRepository = RegionsRepository.getInstance();

  public async execute(dataSource: DataSource): Promise<GetUserProfileInteractorResult> {
    const profile = await this.profileRepository.getProfile(dataSource);
    const department = await this.regionRepository.getDepartment(profile.zipCode, dataSource);
    return new ProfileAuthenticatedResult(profile, department);
  }
}
