import DoorToDoorRepository from "../../data/DoorToDoorRepository";
import { DoorToDoorPollConfig } from "../entities/DoorToDoorPollConfig";
import { Poll } from "../entities/Poll";

export interface DoorToDoorCompletePoll {
  poll: Poll;
  config: DoorToDoorPollConfig;
}

export class GetDoorToDoorCompletePollInteractor {
  private repository = DoorToDoorRepository.getInstance();

  public async execute(campaignId: string): Promise<DoorToDoorCompletePoll> {
    const poll = await this.repository.getDoorToDoorPoll(campaignId);
    const config = await this.repository.getDoorToDoorPollConfig(campaignId);
    return {
      poll,
      config,
    };
  }
}
