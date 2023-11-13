import { DataSource } from "../../data/DataSource";
import QuickPollRepository from "../../data/QuickPollRepository";
import { StatefulQuickPoll } from "../entities/StatefulQuickPoll";

export class GetQuickPollInteractor {
  private quickPollRepository = QuickPollRepository.getInstance();

  public async execute(
    zipCode: string,
    dataSource: DataSource = "remote",
  ): Promise<StatefulQuickPoll> {
    const quickPoll = await this.quickPollRepository.getQuickPoll(zipCode, dataSource);
    const answeredPollsIds = await this.quickPollRepository.getAnsweredQuickPolls();
    return {
      ...quickPoll,
      state: answeredPollsIds.includes(quickPoll.id) ? "answered" : "pending",
    };
  }
}
