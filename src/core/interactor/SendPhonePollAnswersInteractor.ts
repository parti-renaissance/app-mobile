import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhonePollResult } from '../entities/PhonePollResult'
import { Poll } from '../entities/Poll'

export class SendPhonePollAnswersInteractor {
  private phoningCampaignRepository = PhoningCampaignRepository.getInstance()

  public async execute(
    poll: Poll,
    sessionId: string,
    result: PhonePollResult,
  ): Promise<void> {
    await this.phoningCampaignRepository.sendPhonePollAnswers(
      poll,
      sessionId,
      result,
    )

    await this.phoningCampaignRepository.sendSatisfactionAnswers(
      sessionId,
      result.satisfactionAnswers,
    )
  }
}
