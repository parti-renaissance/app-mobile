import ProfileRepository from "../../data/ProfileRepository";
import QuickPollRepository from "../../data/QuickPollRepository";
import { StatefulQuickPoll } from "../entities/StatefulQuickPoll";

export class SaveQuickPollAsAnsweredInteractor {
  private quickPollRepository = QuickPollRepository.getInstance();
  private profileRepository = ProfileRepository.getInstance();

  public async execute(request: {
    quickPollId: string;
    answerId: string;
  }): Promise<StatefulQuickPoll> {
    const poll = await this.quickPollRepository.sendQuickPollAnswer(request.answerId);
    await this.quickPollRepository.saveAnsweredQuickPoll(request.quickPollId);

    // refresh the 'quick polls list' cache
    const zipCode = await this.profileRepository.getZipCode();
    await this.quickPollRepository.getQuickPoll(zipCode, "remote");
    return {
      ...poll,
      state: "answered",
    };
  }
}
