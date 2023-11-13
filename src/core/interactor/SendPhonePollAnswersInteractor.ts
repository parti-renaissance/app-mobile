import PhoningCampaignRepository from "../../data/PhoningCampaignRepository";
import { PhonePollResult } from "../entities/PhonePollResult";
import { Poll } from "../entities/Poll";
import { PhonePollAlreadyAnsweredError } from "../errors";

export class SendPhonePollAnswersInteractor {
  private phoningCampaignRepository = PhoningCampaignRepository.getInstance();

  public async execute(poll: Poll, sessionId: string, result: PhonePollResult): Promise<void> {
    try {
      await this.phoningCampaignRepository.sendPhonePollAnswers(poll, sessionId, result);
    } catch (error) {
      if (error instanceof PhonePollAlreadyAnsweredError) {
        // Recover: we don't want to raise an error, but fail silently
        // if poll has already been answered
      } else {
        throw error;
      }
    }

    await this.phoningCampaignRepository.sendSatisfactionAnswers(
      sessionId,
      result.satisfactionAnswers,
    );
  }
}
